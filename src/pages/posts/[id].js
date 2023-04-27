import { useCallback, useEffect, useState } from "react";
import IndividualPost from "@/components/post/IndividualPost";
import CommentsContainer from "@/components/comment/CommentsContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import NewComment from "@/components/comment/NewComment";

export default function ShowPost({ currentPost, refreshPosts }) {
  const [comments, setComments] = useState(null);
  const router = useRouter();

  let canDelete = false;
  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated") {
    if (!!currentPost && session.user.id === currentPost.posterID) {
      canDelete = true;
    }
  }

  const getComments = useCallback(() => {
    if (!!currentPost) {
      fetch(`/api/posts/${currentPost.id}/comments`)
        .then((res) => res.json())
        .then((response) => {
          console.log("comments Response:", response);
          setComments(response);
        });
    }
  }, [currentPost]);

  const deletePost = async () => {
    if (!!currentPost) {
      console.log("Deleting post:", currentPost.id);
      await fetch(`/api/posts/${currentPost.id}`, {
        method: "DELETE",
      }).then(() => {
        router.push("/");
        refreshPosts();
      });
    }
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  // }, [currentPost]);

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
      {currentPost && <IndividualPost post={currentPost} />}
      {!!canDelete && <button onClick={deletePost}>Delete Post</button>}
      <h2>Comments:</h2>
      {!!comments && <CommentsContainer comments={comments} />}
      <NewComment addComment={addComment} />
    </>
  );
}
