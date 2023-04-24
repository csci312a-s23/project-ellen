import nc from "next-connect";
import Posts from "../../../../../models/Posts.js";
import Votes from "../../../../../models/Votes.js";
import { onError } from "../../../../lib/middleware.js";
import { isAuthenticated } from "../../../../lib/middleware.js";

const handler = nc({ onError })
  .get(isAuthenticated, async (req, res) => {
    const { id } = req.query;

    if (!!id) {
      const post = await Posts.query()
        .findById(parseInt(id))
        .first()
        .throwIfNotFound();

      const getVotes = await Votes.query()
        .where("postID", parseInt(id))
        .sum("value");

      let myVote = 0;

      if (!!req.user) {
        const myVoteRow = await Votes.query()
          .where("postID", parseInt(id))
          .where("voterID", req.user.id);

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
  });

export default handler;
