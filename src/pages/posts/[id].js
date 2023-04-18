import { useEffect, useState } from "react";
import IndividualPost from "@/components/IndividualPost";
import CommentsContainer from "@/components/CommentsContainer";

export default function ShowPost({ currentPost }) {
  const [comments, setComments] = useState(null);

  const getComments = () => {
    if (!!currentPost) {
      console.log("curr", currentPost);
      fetch(`/api/posts/${currentPost.id}/comments`)
        .then((res) => res.json())
        .then((response) => {
          console.log("resy", response);
          setComments(response);
        });
    }
  };

  useEffect(() => {
    // setComments([
    //   {
    //     id: 1,
    //     commenterID: 1,
    //     postID: 1,
    //     content: "commentContent1",
    //     likes: 0,
    //   },
    //   {
    //     id: 2,
    //     commenterID: 2,
    //     postID: 2,
    //     content: "commentContent2",
    //     likes: 3,
    //   },
    // ]);
    getComments();
  }, [currentPost]);

  return (
    <>
      <h1>Post:</h1>
      {currentPost && <IndividualPost post={currentPost} />}
      <h2>Comments:</h2>
      {comments && (
        <CommentsContainer
          postID={currentPost.id}
          comments={comments}
          getComments={getComments}
        />
      )}
    </>
  );
}
