import { useEffect, useState } from "react";
import IndividualPost from "@/components/IndividualPost";
import CommentsContainer from "@/components/CommentsContainer";

export default function ShowPost({ currentPost }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (!!currentPost) {
      // fetch(`/api/${currentPost.id}/comments`)
      //   .then((res) => res.json())
      //   .then((response) => {
      //     setComments(response);
      //   });
      setComments([
        {
          id: 1,
          commenterID: 1,
          postID: 1,
          content: "commentContent1",
          likes: 0,
        },
        {
          id: 2,
          commenterID: 2,
          postID: 2,
          content: "commentContent2",
          likes: 3,
        },
      ]);
      console.log("comments:", comments);
    }
  }, [currentPost]);

  return (
    <>
      <h1>Post:</h1>
      {currentPost && <IndividualPost post={currentPost} />}
      <h2>Comments:</h2>
      {comments && (
        <CommentsContainer comments={comments} setComments={setComments} />
      )}
    </>
  );
}
