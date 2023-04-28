import nc from "next-connect";
import { onError } from "../../../../lib/middleware";
import Posts from "../../../../../models/Posts";
import { getUserIdFromUsername } from ".";

const handler = nc({ onError })
  //return this user's posts
  .get(async (req, res) => {
    const id = await getUserIdFromUsername(req.query);

    if (!id) {
      res.status(400).end("Invalid username");
      return;
    }
    const posts = await Posts.query()
      .where("posterID", id)
      .throwIfNotFound({ message: "No posts made yet!" });
    res.status(200).json(posts);
  });

export default handler;
