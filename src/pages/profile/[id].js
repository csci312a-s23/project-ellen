import ProfileInfo from "@/components/profile/ProfileInfo";
import PostList from "@/components/homepage/postsList";
import CommentsList from "@/components/comment/CommentsContainer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  const [currentUser, updateUser] = useState();
  const [userPosts, setUserPosts] = useState();
  const [userComments, setUserComments] = useState();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const getUserInfo = async () => {
        const detailsResponse = await fetch(`/api/users/${id}`);
        if (detailsResponse.ok) {
          const fetchedUserDetails = await detailsResponse.json();
          updateUser(fetchedUserDetails);
        }
        const postsResponse = await fetch(`/api/users/${id}/posts`);
        if (postsResponse.ok) {
          const fetchedUserPosts = await postsResponse.json();
          setUserPosts(fetchedUserPosts);
        }

        const commentsResponse = await fetch(`/api/users/${id}/comments`);
        if (commentsResponse.ok) {
          const fetchedUserComments = await commentsResponse.json();
          setUserComments(fetchedUserComments);
        }
      };

      if (
        (!currentUser || id !== currentUser.username) &&
        router.pathname.includes("profile")
      ) {
        getUserInfo();
      }
    } else {
      updateUser(undefined);
      setUserPosts(undefined);
      setUserComments(undefined);
    }
  }, [id, currentUser, router.pathname]);

  return (
    <div>
      {currentUser && <ProfileInfo user={currentUser} />}
      {userPosts && <PostList posts={userPosts} sortingFilter="new" />}
      {userComments && <CommentsList comments={userComments} />}
    </div>
  );
}
