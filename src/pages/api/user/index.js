import nc from "next-connect";
import { onError } from "../../../lib/middleware";
import User from "../../../../models/Users";

const handler = nc({ onError })
  //return all users
  .get(async (req, res) => {
    const users = await User.query();
    res.status(200).json(users);
  });

export default handler;
