import { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import styles from "./NewComment.module.css";

export default function NewComment({ addComment }) {
  const [newComment, setNewComment] = useState("");

  const submitNewComment = () => {
    addComment(newComment);
    setNewComment("");
  };
  return (
    <>
      <div className={styles.newCommentContainer}>
        <h3>Make a new comment</h3>
        <div className={styles.entryHolder}>
          <FormControl
            className={styles.entryForm}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-amount">Comment</InputLabel>
            <Input
              className={styles.inputBox}
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
      </div>
    </>
  );
}
