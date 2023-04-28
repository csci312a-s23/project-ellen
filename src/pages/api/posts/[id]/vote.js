import nc from "next-connect";
import Votes from "../../../../../models/Votes.js";
import Posts from "../../../../../models/Posts.js";
import { onError } from "../../../../lib/middleware.js";
import { authenticated } from "../../../../lib/middleware.js";

const handler = nc({ onError }).patch(authenticated, async (req, res) => {
  // handle the upvote or downvote of a post

  const postID = parseInt(req.query.id);
  //validate postID
  if (!postID) {
    res.status(400).end("Invalid Post ID");
    return;
  }
  const { body } = req;
  //validate body
  if (!body) {
    res.status(400).end("Invalid Vote");
    return;
  }
  //validate user
  if (!req.user) {
    res.status(400).end("Invalid User");
    return;
  }
  //validate user has not already voted
  //add after login is implemented

  //get post
  const userID = req.user.id;
  const value = parseInt(req.body.value);

  // delete vote first
  const delVote = await Votes.query()
    .delete()
    .where("postID", postID)
    .where("voterID", userID)
    .where("typeOf", "post");

  // they have not voted before
  if (delVote === 0) {
    // add their vote to total number of votes
    const post = await Posts.query().findById(postID).throwIfNotFound();

    post.num_votes++;
    await Posts.query().patchAndFetchById(parseInt(postID), {
      num_votes: post.num_votes,
    });
  }

  //then insert new vote
  await Votes.query().insert({
    postID: postID,
    voterID: userID,
    value: value,
    typeOf: "post",
  });

  //then get new sum of votes
  const getVotes = await Votes.query()
    .where("postID", postID)
    .where("typeOf", "post")
    .sum("value");

  // console.log(getVotes[0]["sum(`value`)"]);
  res
    .status(200)
    .end(JSON.stringify({ newVoteSum: getVotes[0]["sum(`value`)"] }));
});

export default handler;
