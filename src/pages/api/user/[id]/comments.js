import nc from "next-connect";
import { onError } from "../../../../lib/middleware";
import Comments from "../../../../../models/Comments";

const handler = nc({ onError })
  //return this user's posts
  .get(async (req, res) => {
    const { id } = req.query;
    //validate id
    if (!id) {
      res.status(400).end("Invalid User ID");
      return;
    }
    const posts = await Comments.query()
      .where("commenterID", id)
      .throwIfNotFound();
    res.status(200).json(posts);
  });

export default handler;