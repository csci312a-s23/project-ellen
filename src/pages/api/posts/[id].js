import nc from "next-connect";
import Posts from "../../../../models/Posts.js";

// interaciton with post based on id

const handler = nc()
  .get(async (req, res) => {
    // return [id] post
    console.log("paraps", req.query.id);

    // const post = await knex("posts").where({ id: parseInt(req.query.id) });
    const article = await Posts.query()
      .findById(req.query.id)
      .throwIfNotFound();

    res.status(200).json(article);
  })
  .put(async (req, res) => {
    console.log(req, res);
  });

export default handler;
