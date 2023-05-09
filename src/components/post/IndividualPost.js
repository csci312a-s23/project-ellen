import VoteSlider from "./VoteSlider.js";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { categoryColors } from "../../../data/CategoryColorData.js";
import styles from "./IndividualPost.module.css";

export default function IndividualPost({ post }) {
  const [voteVal, setVoteVal] = useState(0);
  const [voteSum, setVoteSum] = useState(0);
  const [stateTimeout, setStateTimeout] = useState();

  useEffect(() => {
    setVoteSum(post.voteSum);
    setVoteVal(post.myVote);
  }, []);

  const setVote = (vote) => {
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
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            // console.log("response", response);
            setVoteSum(response.newVoteSum);
          });
      }, 2000)
    );
  };

  return (
    <Box className={styles.postContainer}>
      {/* <div data-testid="post"> */}
      <h1 className={styles.title}>
        <div style={{ paddingRight: "20px" }}>{post.title}</div>
        <div
          className={styles.categoryIcon}
          style={{
            backgroundColor: categoryColors[post.category],
          }}
        >
          {post.category}
        </div>
      </h1>
      <div>by: {post?.poster?.username}</div>
      <div>at: {new Date(post.created_at).toISOString().substring(0, 10)}</div>
      <p>{post.content}</p>
      <Box sx={{ width: 200 }}>
        <VoteSlider voteVal={voteVal} setVote={setVote} />
      </Box>
      <span>score: {voteSum}</span>
      <span>number of votes: {post.num_votes}</span>
      {/* </div> */}
    </Box>
  );
}
