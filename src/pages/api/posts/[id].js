import { knex } from "../../../../knex/knex";
import nc from "next-connect";

// interaciton with post based on id

const handler = nc()
  .get(async (req, res) => {
    // return [id] post
    console.log("paraps", req.query.id);

    const post = await knex("posts").where({ id: parseInt(req.query.id) });

    console.log("post outcome", post);
    res.status(200).json(post);
  })
  .put(async (req, res) => {
    console.log(req, res);
    // let post;

    // update post stuff
  });

export default handler;
