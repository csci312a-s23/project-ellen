import nc from "next-connect";
import Posts from "../../../../../models/Posts.js";
import Votes from "../../../../../models/Votes.js";
import { onError } from "../../../../lib/middleware.js";
import { authOptions } from "../../../api/auth/[...nextauth].js";
import { getServerSession } from "next-auth/next";

const handler = nc({ onError })
  .get(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    const { id } = req.query;

    if (!!id) {
      const post = await Posts.query()
        .findById(parseInt(id))
        .first()
        .throwIfNotFound();

      const getVotes = await Votes.query()
        .where("postID", parseInt(id))
        .where("typeOf", "post")
        .sum("value");

      let myVote = 0;

      if (session) {
        const myVoteRow = await Votes.query()
          .where("postID", parseInt(id))
          .where("typeOf", "post")
          .where("voterID", session.user.id);

        if (myVoteRow.length !== 0) {
          myVote = myVoteRow[0].value;
        }
      }

      const newPost = {
        ...post,
        voteSum: getVotes[0]["sum(`value`)"],
        myVote: myVote,
      };

      res.status(200).json(newPost);
      // res.status(200).json(post);
    }
  })
  .put(async (req, res) => {
    console.log(req, res);
  })
  .delete(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    const { id } = req.query;

    if (!!id) {
      const post = await Posts.query()
        .findById(parseInt(id))
        .first()
        .throwIfNotFound();

      if (!!session && session.user.id === post.posterID) {
        await Posts.query().deleteById(parseInt(id)).first().throwIfNotFound();
        res.status(200).json({ message: "Post deleted" });
      } else {
        res.status(403).json({ message: "Not authorized to delete this post" });
      }
    }
  });

export default handler;
