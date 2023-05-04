import nc from "next-connect";
import Comment from "../../../../models/Comments.js";
import { onError } from "../../../lib/middleware.js";

// function to handle returning all posts
const handler = nc({ onError }).get(async (req, res) => {
  const comments = await Comment.query()
    .withGraphFetched("poster")
    .withGraphFetched("post");
  res.status(200).json(comments);
});

export default handler;
