import Link from "next/link";
import VoteSlider from "./VoteSlider.js";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export default function IndividualPost({ post, myID }) {
  const [voteVal, setVoteVal] = useState(0);
  const [voteSum, setVoteSum] = useState(0);
  const [stateTimeout, setStateTimeout] = useState();

  useEffect(() => {
    setVoteSum(post.voteSum);
    setVoteVal(post.myVote);
  }, []);

  const setVote = (vote) => {
    console.log("vote", vote);
    setVoteVal(vote);
    clearTimeout(stateTimeout);
    setStateTimeout(
      setTimeout(() => {
        fetch(`/api/posts/${post.id}/vote`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: vote,
            userID: myID,
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log("response", response);
            setVoteSum(response.newVoteSum);
          });
      }, 2000)
    );
  };

  return (
    <Box sx={{ width: 200 }}>
      <div data-testid="post">
        <p style={{ color: "blue" }}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </p>
        <p>{post.content}</p>
        <p>category: {post.category}</p>
        <p>created at: {post.created_at}</p>
        <p>votes: {voteSum}</p>
        <VoteSlider voteVal={voteVal} setVote={setVote} />
      </div>
    </Box>
  );
}
