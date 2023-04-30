import { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";

export default function NewComment({ addComment }) {
  const [newComment, setNewComment] = useState("");

  const submitNewComment = () => {
    addComment(newComment);
    setNewComment("");
  };
  return (
    <>
      <h2>Make a new comment</h2>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Comment</InputLabel>
          <Input
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            id="standard-adornment-amount"
          />
        </FormControl>
        <Button
          sx={{ margin: 2 }}
          variant="contained"
          onClick={() => submitNewComment()}
        >
          submit
        </Button>
      </div>
    </>
  );
}
