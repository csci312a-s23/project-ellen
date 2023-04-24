import nc from "next-connect";
import Vote from "../../../../../models/Votes.js";
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
  //validate vote
  // if (body.vote !== "upvote" && body.vote !== "downvote") {
  //   res.status(400).end("Invalid Vote");
  //   return;
  // }
  //validate user
  if (!body.userID) {
    res.status(400).end("Invalid User");
    return;
  }
  //validate user has not already voted
  //add after login is implemented

  //get post
  const userID = parseInt(req.body.userID);
  const value = parseInt(req.body.value);
  await Vote.query().delete().where("postID", postID).where("voterID", userID);

  await Vote.query().insert({ postID: postID, voterID: userID, value: value });

  const getVotes = await Vote.query().where("postID", postID).sum("value");

  console.log(getVotes[0]["sum(`value`)"]);
  res
    .status(200)
    .end(JSON.stringify({ newVoteSum: getVotes[0]["sum(`value`)"] }));
});

export default handler;
