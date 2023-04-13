import nc from "next-connect";
import Post from "../../../../models/Posts.js";
// import { knex } from "../../../../knex/knex.js";
// interaciton with post based on id

const handler = nc()
  .get(async (req, res) => {
    const post = await Post.query().findById(parseInt(req.query.id)).first();

    res.status(200).json(post);
  })
  .put(async (req, res) => {
    console.log(req, res);
  });

export default handler;
