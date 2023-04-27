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

      // let commentsWVote = comments.map(async comment => {

      // 			for (let i = 0; i < comments.length; i++) {
      // 				// console.log("comment", comments[i])
      // 				const commentVal = await Votes.query()
      // 					.where({ postID: parseInt(id) })
      // 					.where({ commentID: comments[i].id })
      // 					.where({ typeOf: "comment" })
      // 					.sum("value");

      // 				// console.log("value:", commentVal[0]["sum(`value`)"])

      // 				comments[i] = {
      // 					...comments[i],
      // 					newVoteSum: commentVal[0]["sum(`value`)"],
      // 				};
      // 			}

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
    console.log("patching comment");

    const { postID } = req.body;
    const { commentID } = req.body;
    const { vote } = req.body;
    let value = 0;
    if (vote === "upvote") {
      value = 1;
    }
    if (vote === "downvote") {
      value = -1;
    }

    // get previous vote

    const votes = await Votes.query()
      .where("postID", parseInt(postID))
      .where("commentID", parseInt(commentID))
      .where("voterID", req.user.id)
      .where("typeOf", "comment")
      .first();

    let commentSum = 0;

    //if they have voted before
    if (!!votes) {
      commentSum -= votes.value;
      await Votes.query()
        .delete()
        .where("postID", parseInt(postID))
        .where("commentID", parseInt(commentID))
        .where("voterID", req.user.id)
        .where("typeOf", "comment");
      console.log("has voted before:", commentSum);
    }

    const comment = await Comments.query()
      .findById(commentID)
      .throwIfNotFound();

    console.log("current likes::", comment.likes);
    comment.likes += parseInt(value + commentSum);
    console.log("new likes:", comment.likes);

    await Comments.query().patchAndFetchById(parseInt(commentID), {
      // num_votes: comment.num_votes,
      likes: comment.likes,
    });
    //then insert new vote
    await Votes.query().insert({
      postID: postID,
      voterID: req.user.id,
      commentID: commentID,
      value: value,
      typeOf: "comment",
    });

    res.status(200).end(JSON.stringify({ newVoteSum: comment.likes }));
    //then get new sum of votes
    // const getVotes = await Votes.query()
    // 	.where("postID", postID)
    // 	.where("typeOf", "post")
    // 	.sum("value");
  });

export default handler;
