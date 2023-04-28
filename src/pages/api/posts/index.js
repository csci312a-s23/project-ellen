import nc from "next-connect";
import Post from "../../../../models/Posts.js";
import { onError } from "../../../lib/middleware.js";
import { authenticated } from "../../../lib/middleware.js";
import { authOptions } from "../auth/[...nextauth].js";
import { getServerSession } from "next-auth/next";

// function to handle returning all posts
const handler = nc({ onError })
  .get(async (req, res) => {
    const { category } = req.query;

    let posts;

    if (!!category) {
      // posts = await knex("posts").where({ category: category });
      posts = await Post.query()
        .where({ category: category })
        .throwIfNotFound();
    } else {
      posts = await Post.query();
    }
    res.status(200).json(posts);
  })
  .post(authenticated, async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    const { body } = req;

    if (!body) {
      res.status(500).end("Need Body");
    }

    const newPost = await Post.query().insertAndFetch({
      posterID: session.user.id,
      title: body?.title,
      content: body?.content,
      category: body?.category,
      created_at: new Date().toISOString(),
    });

    res.status(200).json(newPost);
  });

export default handler;
