import nc from "next-connect";
import Posts from "../../../../models/Posts.js";
// function to handle returning all posts
const handler = nc().get(async (req, res) => {
  const { category } = req.query;
  let posts;

  if (!!category) {
    // posts = await knex("posts").where({ category: category });
    posts = await Posts.query().where({ category: category }).throwIfNotFound();
  } else {
    posts = await Posts.query().where({ category: category });
  }
  res.status(200).json(posts);
});

export default handler;
