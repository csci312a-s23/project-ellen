import nc from "next-connect";
import Posts from "../../../../models/Posts.js";
import { onError } from "../../../lib/middleware.js";

// function to handle returning all posts with attached usernames
const handler = nc({ onError }).get(async (req, res) => {
  const posts = await Posts.query()
    .withGraphFetched("poster")
    .modifyGraph("poster", (builder) => {
      builder.select("username");
    });
  console.log(posts);
  res.status(200).json(posts);
});

export default handler;
