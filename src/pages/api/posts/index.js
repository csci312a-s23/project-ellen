import nc from "next-connect";
import Post from "../../../../models/Posts.js";
import { onError } from "../../../lib/middleware.js";
import { authenticated } from "../../../lib/middleware.js";

// function to handle returning all posts
const handler = nc({ onError })
  .get(async (req, res) => {
    const { category } = req.query;

    const postQuery = Post.query();

    if (!!category) {
      postQuery.where({ category: category }).throwIfNotFound();
    }
    const posts = await postQuery;
    res.status(200).json(posts);
  })
  .post(authenticated, async (req, res) => {
    const { body } = req;

    if (!body) {
      res.status(500).end("Need Body");
      return;
    }

    const newPost = await Post.query().insertAndFetch({
      posterID: req.user.id,
      title: body?.title,
      content: body?.content,
      category: body?.category,
      created_at: new Date().toISOString(),
    });

    res.status(200).json(newPost);
  });

export default handler;
