import nc from "next-connect";
import Posts from "../../../../models/Posts.js";
// import { knex } from "../../../../knex/knex.js";
// interaciton with post based on id

const handler = nc()
  .get(async (req, res) => {
    // return [id] post
    console.log("paraps", req.query.id);

    // const post = await knex("posts").where({ id: parseInt(req.query.id) });
    const article = await Posts.query()
      .where({ id: parseInt(req.query.id) })
      .first();

    console.log("git article:", article);
    res.status(200).json(article);
    // res.status(200).json(post);
  })
  .put(async (req, res) => {
    console.log(req, res);
  });

export default handler;
