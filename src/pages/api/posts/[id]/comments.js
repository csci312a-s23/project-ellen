import nc from "next-connect";
import Comments from "../../../../../models/Comments";
import Posts from "../../../../../models/Posts";
import Users from "../../../../../models/Users";
import Votes from "../../../../../models/Votes";
import { onError } from "../../../../lib/middleware.js";
import { authenticated } from "../../../../lib/middleware.js";
import { getServerSession, authOptions } from "next-auth";

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
        .withGraphFetched("poster")
        .modifyGraph("poster", (builder) => {
          builder.select("username");
        })
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
    // const maxId = await Comments.query().max("id");

    const comment = await Comments.query().insertAndFetch({
      // id: parseInt(maxId[0]["max(`id`)"]) + 1,
      postID: parseInt(id),
      commenterID: req.user.id,
      content: newComment.content,

      likes: 0,
      created_at: new Date().toISOString(),
    });
    res.status(200).json(comment);
  })
  .patch(authenticated, async (req, res) => {
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
    }

    const comment = await Comments.query()
      .findById(commentID)
      .throwIfNotFound();

    comment.likes += parseInt(value + commentSum);

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
  })
  .delete(authenticated, async (req, res) => {
    // const { postID } = req.body;
    const { commentID } = req.body;
    console.log(commentID);

    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (!!commentID) {
      const comment = await Comments.query()
        .findById(parseInt(commentID))
        .throwIfNotFound();

      const user = await Users.query()
        .findById(session.user.id)
        .select("isAdmin");

      if (comment.commenterID === req.user.id || user.isAdmin === 1) {
        await Comments.query()
          .deleteById(parseInt(commentID))
          .throwIfNotFound();
        res.status(200).json({ message: "Comment deleted" });
      } else {
        res
          .status(403)
          .json({ message: "Not authorized to delete this comment" });
      }
    }
  });

export default handler;
