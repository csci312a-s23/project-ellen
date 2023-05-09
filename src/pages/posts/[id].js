import { useCallback, useEffect, useState } from "react";
import IndividualPost from "@/components/post/IndividualPost";
import CommentsContainer from "@/components/comment/CommentsContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Fab from "@mui/material/Fab";
import "@/styles/globals.css";

import NewComment from "@/components/comment/NewComment";
import FilterBar from "@/components/homepage/filterBar";

export default function ShowPost({ currentPost, refreshPosts }) {
  const [comments, setComments] = useState(null);
  const router = useRouter();

  let canDelete = false;
  const { data: session, status } = useSession({ required: false });

  //additionally confirms in the backend
  //for conditionally rendering the deletePost button
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
          setComments(response);
        });
    }
  }, [currentPost]);

  const deletePost = async () => {
    if (!!currentPost) {
      await fetch(`/api/posts/${currentPost.id}`, {
        method: "DELETE",
      }).then(() => {
        router.push("/");
        refreshPosts();
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
  }, [getComments]);

  const addComment = async (comment) => {
    await fetch(`/api/posts/${currentPost.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentPost.id,
        content: comment,
      }),
    });
    getComments();
  };

  const [currentSortFilter, setCurrentSortFilter] = useState("new");

  //handles filter change
  const changeSortFilter = (newFilter) => {
    setCurrentSortFilter(newFilter);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <<<<<<< HEAD
      <Fab
        variant="extended"
        // style={}
        color="primary"
        onClick={() => {
          router.push("/");
        }}
      >
        <ArrowBackIcon />
      </Fab>

      <div
        style={{
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
          {!!canDelete && <button onClick={deletePost}>Delete Post</button>}
          <h2>Comments:</h2>
          {!!comments && (
            <CommentsContainer
              comments={comments}
              vote={vote}
              whereis="postViewer"
            />
          )}
          <NewComment addComment={addComment} />
        </div>
======= */}
      <div
        style={{
          // width: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // padding: 10,
          borderRadius: 10,
        }}
      >
        <FilterBar
          currentSortFilter={currentSortFilter}
          setCurrentSortFilter={changeSortFilter}
          currentPost={currentPost}
        />
        {!!currentPost && <IndividualPost post={currentPost} />}
        {!!canDelete && <button onClick={deletePost}>Delete Post</button>}
        <h2>Comments:</h2>
        <NewComment addComment={addComment} />
        {!!comments && (
          <CommentsContainer
            comments={comments}
            vote={vote}
            whereis="postViewer"
          />
        )}
      </div>
    </div>
  );
}
