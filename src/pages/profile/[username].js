import ProfileInfo from "@/components/profile/ProfileInfo";
import PostList from "@/components/homepage/postsList";
import CommentsContainer from "@/components/comment/CommentsContainer";
import styles from "@/styles/Profile.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Profile() {
  const router = useRouter();

  const { data: session } = useSession({ required: false });

  const [currentUser, updateUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [userComments, setUserComments] = useState();
  const [allowEdit, setAllow] = useState(false);

  const { username } = router.query;

  const getComments = async () => {
    const commentsResponse = await fetch(`/api/users/${username}/comments`);
    if (commentsResponse.ok) {
      const fetchedUserComments = await commentsResponse.json();
      setUserComments(fetchedUserComments);
    } else {
      setUserComments();
    }
  };

  const deleteComment = async (commentID, postID) => {
    await fetch(`/api/posts/${postID.id}/comments/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: postID,
        commentID: commentID,
      }),
    });
    getComments();
    router.push(`/profile/${currentUser.username}`);
  };

  useEffect(() => {
    if (username) {
      const getUserInfo = async () => {
        const detailsResponse = await fetch(`/api/users/${username}`);
        if (detailsResponse.ok) {
          const fetchedUserDetails = await detailsResponse.json();
          updateUser(fetchedUserDetails);
        }
        const postsResponse = await fetch(`/api/users/${username}/posts`);
        if (postsResponse.ok) {
          const fetchedUserPosts = await postsResponse.json();
          setUserPosts(fetchedUserPosts);
        }

        getComments();
      };

      if (router.pathname.includes("profile")) {
        getUserInfo();
      }
    } else {
      updateUser(undefined);
      setUserPosts(undefined);
      setUserComments(undefined);
    }

    //Only allow edit if same profile
    if (username && session) {
      if (session.user.name === username) {
        setAllow(true);
      }
    }
    //alternative is to use useCallback on getComments but it's messing up testing and functionality
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, router.pathname, session]);

  const vote = async (action, commentID, postID) => {
    await fetch(`/api/posts/${postID}/comments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: postID,
        commentID: commentID,
        vote: action,
      }),
    });
    getComments();
  };

  return (
    <div>
      {currentUser && <ProfileInfo user={currentUser} />}
      <div className={styles.editButton}>
        {allowEdit && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/profile/${username}/edit`)}
            aria-label="Edit"
          >
            Edit
          </Button>
        )}
      </div>

      <div className={styles.userContent}>
        {userPosts && <PostList posts={userPosts} sortingFilter="new" />}
        {userComments && (
          <CommentsContainer
            comments={userComments}
            vote={vote}
            deleteComment={deleteComment}
            whereis="profile"
          />
        )}
      </div>
    </div>
  );
}
