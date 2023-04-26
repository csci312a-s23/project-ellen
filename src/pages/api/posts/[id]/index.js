import nc from "next-connect";
import Posts from "../../../../../models/Posts.js";
import { onError } from "../../../../lib/middleware.js";
// interaciton with post based on id

const handler = nc({ onError })
  .get(async (req, res) => {
    const { id } = req.query;

    if (!!id) {
      const post = await Posts.query()
        .findById(parseInt(id))
        .first()
        .throwIfNotFound();

      res.status(200).json(post);
    }
  })
  .put(async (req, res) => {
    console.log(req, res);
  });

export default handler;
