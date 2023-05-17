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
    let posts = await postQuery
      .withGraphFetched("[comments,votes]")
      .modifyGraph("votes", (builder) => {
        builder.where("typeOf", "=", "post");
        builder.select("value");
      });

    posts = posts.map((post) => {
      // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
      const num_votes = post["votes"].length;
      const sum = post["votes"].reduce(
        (partialSum, a) => partialSum + a.value,
        0
      );
      return {
        ...post,
        score: sum,
        num_votes: num_votes,
      };
    });
    res.status(200).json(posts);
  })
  .post(authenticated, async (req, res) => {
    const { body } = req;

    if (!body) {
      res.status(500).end("Need Body");
      return;
    }

    const newPost = await Post.query().insertAndFetch({
      posterID: !!body.anonomous
        ? "51e2c13b-dfd5-4ed4-8805-f03357a3083b"
        : req.user.id,
      title: body?.title,
      content: body?.content,
      category: body?.category,
      created_at: new Date().toISOString(),
    });
    console.log(newPost);

    res.status(200).json(newPost);
  });

export default handler;
