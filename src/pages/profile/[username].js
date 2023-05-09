import ProfileInfo from "@/components/profile/ProfileInfo";
import PostList from "@/components/homepage/postsList";
import CommentsContainer from "@/components/comment/CommentsContainer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function Profile() {
  const router = useRouter();

  const [currentUser, updateUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [userComments, setUserComments] = useState();

  const { username } = router.query;

  const { data: session } = useSession({ required: true });

  const getComments = async () => {
    const commentsResponse = await fetch(`/api/users/${username}/comments`);
    if (commentsResponse.ok) {
      const fetchedUserComments = await commentsResponse.json();
      setUserComments(fetchedUserComments);
    }
  };

  useEffect(() => {
    if (username && session) {
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

      if (
        (!currentUser || username !== currentUser.username) &&
        router.pathname.includes("profile") &&
        session.user.name === username
      ) {
        getUserInfo();
      }
    } else {
      updateUser(undefined);
      setUserPosts(undefined);
      setUserComments(undefined);
    }
  }, [username, currentUser, router.pathname, session]);

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(`/profile/${username}/edit`)}
        >
          Edit
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userPosts && <PostList posts={userPosts} sortingFilter="new" />}
        {userComments && (
          <CommentsContainer
            comments={userComments}
            vote={vote}
            whereis="profile"
          />
        )}
      </div>
    </div>
  );
}
