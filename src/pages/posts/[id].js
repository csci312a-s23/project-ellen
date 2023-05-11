import { useCallback, useEffect, useState } from "react";
import IndividualPost from "@/components/post/IndividualPost";
import CommentsContainer from "@/components/comment/CommentsContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fab from "@mui/material/Fab";
import styles from "@/styles/ShowPost.module.css";

import NewComment from "@/components/comment/NewComment";
import FilterBar from "@/components/homepage/filterBar";

export default function ShowPost({
  currentPost,
  refreshPosts,
  setUnauthorized,
  setAuthMessage,
}) {
  const [comments, setComments] = useState(null);
  const [canDelete, setCanDelete] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession({ required: false });

  //additionally confirms in the backend
  //for conditionally rendering the deletePost button
  useEffect(() => {
    if (status === "authenticated") {
      if (
        !!currentPost &&
        (session.user.id === currentPost.posterID || session.user.isAdmin)
      ) {
        setCanDelete(true);
        setUnauthorized(false);
      }
    }
  }, [status, currentPost]);

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
      // await fetch(`/api/posts/${currentPost.id}`, {
      //   method: "DELETE",
      // }).then(() => {
      //   router.push("/");
      //   refreshPosts();
      // });
      const res = await fetch(`/api/posts/${currentPost.id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        router.push("/");
        refreshPosts();
      }
      if (res.status === 401 || res.status === 403) {
        setUnauthorized(true);
        setAuthMessage(res.statusText);
      }
    }
  };

  const vote = async (action, commentID) => {
    const res = await fetch(`/api/posts/${currentPost.id}/comments`, {
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

    if (res.status === 401 || res.status === 403) {
      setUnauthorized(true);
      setAuthMessage(res.statusText);
    }
    getComments();
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  const addComment = async (comment) => {
    const res = await fetch(`/api/posts/${currentPost.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentPost.id,
        content: comment,
      }),
    });
    if (res.status === 401 || res.status === 403) {
      setUnauthorized(true);
      setAuthMessage(res.statusText);
    }
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
      <div
        style={{
          display: "flex",
        }}
      >
        <div className={styles.backButtonContainer}>
          <Fab
            className={styles.backButton}
            variant="extended"
            color="primary"
            onClick={() => {
              router.push("/");
            }}
          >
            <ArrowBackIcon />
          </Fab>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <FilterBar
            currentSortFilter={currentSortFilter}
            setCurrentSortFilter={changeSortFilter}
            currentPost={currentPost}
          />
          {!!currentPost && (
            <IndividualPost
              post={currentPost}
              setUnauthorized={setUnauthorized}
            />
          )}
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
    </div>
  );
}
