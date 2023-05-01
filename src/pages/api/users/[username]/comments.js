import nc from "next-connect";
import { onError } from "../../../../lib/middleware";
import Comments from "../../../../../models/Comments";
import { getUserIdFromUsername } from "../../../../lib/middleware";

const handler = nc({ onError })
  //return this user's posts
  .get(async (req, res) => {
    const id = await getUserIdFromUsername(req.query);

    //validate id
    if (!id) {
      res.status(400).end("Invalid username");
      return;
    }
    const comments = await Comments.query()
      .where("commenterID", id)
      .throwIfNotFound({ message: "No comments made yet!" });
    res.status(200).json(comments);
  });

export default handler;
