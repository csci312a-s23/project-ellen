import { useEffect, useState } from "react";
import IndividualPost from "@/components/IndividualPost";

export default function ShowPost({ currentPost }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!!currentPost) {
      fetch(`/api/${currentPost.id}/comments`)
        .then((res) => res.json())
        .then((response) => {
          setComments(response);
        });
      console.log("comments:", comments);
    }
  }, [currentPost]);

  return <>{currentPost && <IndividualPost post={currentPost} />}</>;
}
