import nc from "next-connect";
import Posts from "../../../../../models/Posts.js";
// import { knex } from "../../../../knex/knex.js";
// interaciton with post based on id

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query;

    if (!!id) {
      const post = await Posts.query().findById(parseInt(id)).first();

      res.status(200).json(post);
    }
  })
  .put(async (req, res) => {
    console.log(req, res);
  });

export default handler;
