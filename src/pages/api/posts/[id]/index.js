import nc from "next-connect";
import Posts from "../../../../../models/Posts.js";
import Votes from "../../../../../models/Votes.js";
import Users from "../../../../../models/Users.js";
import Comments from "../../../../../models/Comments.js";
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
        .withGraphFetched("[poster,votes]")
        .modifyGraph("votes", (builder) => {
          builder.select("value");
        })
        .modifyGraph("poster", (builder) => {
          builder.select("username");
        })

        .throwIfNotFound();

      // const getVotes = await Votes.query() .where("postID", parseInt(id))
      //   .where("typeOf", "post")
      //   .sum("value");

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
      const num_votes = post["votes"].length;
      const sum = post["votes"].reduce(
        (partialSum, a) => partialSum + a.value,
        0
      );
      const returnPost = {
        ...post,
        score: sum,
        num_votes: num_votes,
        myVote: myVote,
      };

      res.status(200).json(returnPost);
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

      const user = await Users.query()
        .findById(session.user.id)
        .select("isAdmin");

      if ((!!session && session.user.id === post.posterID) || !!user.isAdmin) {
        //delete post and all associated votes and comments
        await Votes.query().delete().where("postID", parseInt(id));
        await Comments.query().delete().where("postID", parseInt(id));
        await Posts.query().deleteById(parseInt(id)).throwIfNotFound();

        res.status(200).json({ message: "Post deleted" });
      } else {
        res.status(403).json({ message: "Not authorized to delete this post" });
      }
    }
  });

export default handler;
