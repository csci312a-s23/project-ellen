import nc from "next-connect";
import Votes from "../../../../models/Votes.js";
import { onError } from "../../../lib/middleware.js";

// function to handle returning all posts
const handler = nc({ onError }).get(async (req, res) => {
  const votes = await Votes.query();
  res.status(200).json(votes);
});

export default handler;
