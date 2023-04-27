import nc from "next-connect";
import Comments from "../../../../../models/Comments";
import Posts from "../../../../../models/Posts";
import Votes from "../../../../../models/Votes";
import { onError } from "../../../../lib/middleware.js";
import { authenticated } from "../../../../lib/middleware.js";

const handler = nc({ onError })
  .get(async (req, res) => {
    // get all comments associated with a given post

    const { id } = req.query;
    if (!!id) {
      // check if the post exists:
      await Posts.query()
        .findById(parseInt(id))
        .first()
        .withGraphFetched("votes")
        .throwIfNotFound({
          message: `Post with id ${id} not found... cannot retrieve comments`,
        });

      // if the post exists- fetch the comments
      const comments = await Comments.query()
        .where({ postID: parseInt(id) })
        .throwIfNotFound({ message: "No comments associated with this post" });

      res.status(200).json(comments);
    } else {
      res.status(404).end(`${id} is not valid`);
    }
  })
  .post(authenticated, async (req, res) => {
    // post a new comment to a given post
    const { id } = req.query;
    const newComment = req.body;
    // we want to automatically assign a new comment ID
    const maxId = await Comments.query().max("id");

    const comment = await Comments.query().insertAndFetch({
      id: parseInt(maxId[0]["max(`id`)"]) + 1,
      postID: parseInt(id),
      commenterID: newComment?.commenterID,
      content: newComment.content,

      likes: 0,
      created_at: new Date().toISOString(),
    });
    res.status(200).json(comment);
  })
  .patch(authenticated, async (req, res) => {
    // const { id } = req.query;
    const { postID } = req.body;
    const { commentID } = req.body;
    // const {value} = req.body;

    const delVote = await Votes.query()
      .delete()
      .where("postID", postID)
      .where("commentID", commentID)
      .where("voterID", req.user.id)
      .where("typeOf", "comment");

    // they have not voted before
    if (delVote === 0) {
      // add their vote to total number of votes
      // const post = await Posts.query()
      // 	.findById(postID)
      // 	.throwIfNotFound();
      // post.num_votes++;
      // await Posts.query().patchAndFetchById(parseInt(postID), {
      // 	num_votes: post.num_votes,
      // });
    }

    //then insert new vote
    const ret = await Votes.query().insertAndFetch({
      postID: postID,
      voterID: req.user.id,
      commentID: commentID,
      value: 1,
      typeOf: "post",
    });

    res.status(200).json(ret);
    //then get new sum of votes
    // const getVotes = await Votes.query()
    // 	.where("postID", postID)
    // 	.where("typeOf", "post")
    // 	.sum("value");
  });

export default handler;
