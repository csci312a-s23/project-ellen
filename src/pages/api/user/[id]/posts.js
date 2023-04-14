import nc from "next-connect";
import { onError } from "../../../../lib/middleware";
import User from "../../../../../models/Users";

const handler = nc({ onError })
  //return this user's posts
  .get(async (req, res) => {
    const {id} = req.query;
    console.log(id);
    const user = await User.query()
      .findById(id)
      .withGraphFetched("posts")
      .throwIfNotFound();
    console.log(user);
    res.status(200).json(user.posts);
  });

export default handler;
