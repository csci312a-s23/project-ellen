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

  useEffect(() => {
    getComments();
  }, [currentPost]);

  const addComment = (comment) => {
    fetch(`/api/posts/${currentPost.id}/comments`, {
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
    <>
      <h1>Post:</h1>
      {!!currentPost && <IndividualPost post={currentPost} />}
      <h2>Comments:</h2>
      {!!comments && <CommentsContainer comments={comments} />}
      <NewComment addComment={addComment} />
    </>
  );
}
