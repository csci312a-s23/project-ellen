import { knex } from "../../../../knex/knex";
import nc from "next-connect";

// function to handle returning all posts
const handler = nc().get(async (req, res) => {
  const { category } = req.query;
  let posts;

  if (!!category) {
    posts = await knex("posts").where({ category: category });
  } else {
    posts = await knex("posts");
  }
  res.status(200).json(posts);
});

export default handler;
