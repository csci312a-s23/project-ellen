import nc from "next-connect";
import Posts from "../../../../../models/Posts.js";
import Votes from "../../../../../models/Votes.js";
import { onError } from "../../../../lib/middleware.js";
// interaciton with post based on id

const handler = nc({ onError })
  .get(async (req, res) => {
    const { id } = req.query;
    const { myID } = req.query;

    if (!!id) {
      const post = await Posts.query()
        .findById(parseInt(id))
        .first()
        .throwIfNotFound();

      const getVotes = await Votes.query()
        .where("postID", parseInt(id))
        .sum("value");

      let myVote = 0;
      console.log("myid", myID);
      if (!!myID) {
        const myVoteRow = await Votes.query()
          .where("postID", parseInt(id))
          .where("voterID", parseInt(myID));
        myVote = myVoteRow[0].value;
      }

      // console.log(getVotes[0]["sum(`value`)"])

      console.log("post", post);

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
