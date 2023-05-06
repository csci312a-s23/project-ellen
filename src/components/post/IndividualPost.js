import VoteSlider from "./VoteSlider.js";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export default function IndividualPost({ post }) {
  const [voteVal, setVoteVal] = useState(0);
  const [voteSum, setVoteSum] = useState(0);
  const [stateTimeout, setStateTimeout] = useState();

  console.log("post data:", post);

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
    <Box
      sx={{
        width: 800,
        // bgcolor: "lightgray",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        borderRadius: 10,
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      {/* <div data-testid="post"> */}
      <h1 style={{ display: "flex", alignItems: "center" }}>
        <div style={{ paddingRight: "20px" }}>{post.title}</div>
        <div
          style={{
            fontSize: "15px",
            color: "white",
            backgroundColor: "lightblue",
            textAlign: "center",
            padding: "2px 5px 2px 5px",
            borderRadius: "10px",
            // display: "flex", alignItems: "center", flexDirection: "row", justifyContent:"center"
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
      <p>total votes: {voteSum}</p>
      {/* </div> */}
    </Box>
  );
}
