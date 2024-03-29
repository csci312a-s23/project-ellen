import VoteSlider from "./VoteSlider.js";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { categoryColors } from "../../../data/CategoryColorData.js";
import styles from "./IndividualPost.module.css";
import Link from "next/link";

export default function IndividualPost({ post, setUnauthorized }) {
  const [voteVal, setVoteVal] = useState(0);
  const [voteSum, setVoteSum] = useState(0);
  const [numVotes, setNumVotes] = useState(0);

  useEffect(() => {
    setVoteSum(post.score);
    setVoteVal(post.myVote);
    setNumVotes(post.num_votes);
  }, [post]);

  const setVote = async (vote) => {
    setVoteVal(vote);
    const res = await fetch(`/api/posts/${post.id}/vote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: vote,
      }),
    });
    if (res.status === 200) {
      const response = await res.json();
      setVoteSum(response.newVoteSum);
      if (!!response.isNew) {
        setNumVotes(post.num_votes + 1);
      }
    }
    if (res.status === 401 || res.status === 403) {
      setUnauthorized(true);
    }
  };

  return (
    <Box className={styles.postContainer}>
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
      {post.poster?.username !== "anonymous" ? (
        <Link href={`/profile/${post?.poster?.username}`}>
          <div>by: {post.poster?.username}</div>
        </Link>
      ) : (
        <div>by: anonymous</div>
      )}

      <div>at: {new Date(post.created_at).toISOString().substring(0, 10)}</div>
      <p>{post.content}</p>
      <Box sx={{ width: 200 }}>
        <VoteSlider voteVal={voteVal} setVote={setVote} />
      </Box>
      <span>score: {voteSum}</span>
      <span>number of votes: {numVotes} </span>
      {/* </div> */}
    </Box>
  );
}
