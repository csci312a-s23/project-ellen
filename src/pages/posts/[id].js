import { useEffect, useState } from "react";
import IndividualPost from "@/components/post/IndividualPost";
import CommentsContainer from "@/components/comment/CommentsContainer";
import NewComment from "@/components/comment/NewComment";
export default function ShowPost({ currentPost }) {
  const [comments, setComments] = useState(null);

  const getComments = () => {
    if (!!currentPost) {
      fetch(`/api/posts/${currentPost.id}/comments`)
        .then((res) => res.json())
        .then((response) => {
          console.log("comments Response:", response);
          setComments(response);
        });
    }
  };

  const vote = async (action, commentID) => {
    await fetch(`/api/posts/${currentPost.id}/comments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: currentPost.id,
        commentID: commentID,
        vote: action,
      }),
    });
    getComments();
  };

  useEffect(() => {
    getComments();
  }, [currentPost]);

  const addComment = async (comment) => {
    await fetch(`/api/posts/${currentPost.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentPost.id,
        // change this once we've got user id from auth
        commenterID: "1",
        content: comment,
      }),
    });
    getComments();
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          width: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          backgroundColor: "darkgray",
          borderRadius: 10,
        }}
      >
        {!!currentPost && <IndividualPost post={currentPost} />}
        <h2>Comments:</h2>
        {!!comments && <CommentsContainer comments={comments} vote={vote} />}
        <NewComment addComment={addComment} />
      </div>
    </div>
  );
}
