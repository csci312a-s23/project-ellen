import { useState } from "react";

export default function NewComment({ addComment }) {
  const [newComment, setNewComment] = useState("");

  const submitNewComment = () => {
    addComment(newComment);
  };
  return (
    <>
      <h2>Make a new comment</h2>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button type="button" onClick={() => submitNewComment()}>
        {" "}
        Submit{" "}
      </button>
    </>
  );
}
