import { knex } from "../../../../knex/knex";
import nc from "next-connect";
// interaciton with post based on id

const handler = nc()
  .get(async (req, res) => {
    // return [id] post
    const post = await knex("testTable").where({ id: query.id });

    res.status(200).json(post);
  })
  .put(async (req, res) => {
    console.log(req, res);
    // let post;

    // update post stuff
  });

export default handler;
