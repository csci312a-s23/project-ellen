import ProfileInfo from "@/components/profile/ProfileInfo";
import PostList from "@/components/homepage/postsList";
import CommentsContainer from "@/components/comment/CommentsContainer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  const [currentUser, updateUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [userComments, setUserComments] = useState();

  const { username } = router.query;

  const getComments = async () => {
    const commentsResponse = await fetch(`/api/users/${username}/comments`);
    if (commentsResponse.ok) {
      const fetchedUserComments = await commentsResponse.json();
      setUserComments(fetchedUserComments);
    }
  };

  const getPosts = async () => {
    const postsResponse = await fetch(`/api/users/${username}/posts`);
    if (postsResponse.ok) {
      const fetchedUserPosts = await postsResponse.json();
      setUserPosts(fetchedUserPosts);
    }
  };

  const getUserInfo = async () => {
    const detailsResponse = await fetch(`/api/users/${username}`);
    if (detailsResponse.ok) {
      const fetchedUserDetails = await detailsResponse.json();
      updateUser(fetchedUserDetails);
    }
    getPosts();

    getComments();
  };

  useEffect(() => {
    if (username) {
      if (router.pathname.includes("profile")) {
        getUserInfo();
      }
    } else {
      updateUser(undefined);
      setUserPosts(undefined);
      setUserComments(undefined);
    }
  }, [username, router.pathname]);

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
      {userPosts && <PostList posts={userPosts} sortingFilter="new" />}
      {userComments && (
        <CommentsContainer
          comments={userComments}
          vote={vote}
          whereis="profile"
        />
      )}
    </div>
  );
}
