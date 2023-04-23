import { useEffect, useState } from "react";
import IndividualPost from "@/components/post/IndividualPost";
import CommentsContainer from "@/components/comment/CommentsContainer";

export default function ShowPost({ currentPost, myID }) {
  const [comments, setComments] = useState(null);

  const getComments = () => {
    if (!!currentPost) {
      console.log("currentPost:", currentPost);
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

  return (
    <>
      <h1>Post:</h1>
      {currentPost && <IndividualPost post={currentPost} myID={myID} />}
      <h2>Comments:</h2>
      {!!comments && (
        <CommentsContainer
          postID={currentPost.id}
          comments={comments}
          getComments={getComments}
        />
      )}
    </>
  );
}
