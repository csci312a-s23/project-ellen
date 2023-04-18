import ProfileInfo from "../../components/ProfileInfo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import ProfilePosts from "@/components/ProfilePosts";

export default function Profile() {
  const router = useRouter();

  const [currentUser, updateUser] = useState();
  // const [userPosts, setUserPosts] = useState();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id);
      const getUserInfo = async () => {
        const detailsResponse = await fetch(`/api/user/${numberId}`);
        if (detailsResponse.ok) {
          const fetchedUserDetails = await detailsResponse.json();
          updateUser(fetchedUserDetails);
        }
        // const postsResponse = await fetch(`/api/user/${numberId}/posts`);
        // if (postsResponse.ok) {
        //   const fetchedUserPosts = await postsResponse.json();
        //   setUserPosts(fetchedUserPosts);
        // }
      };

      if (
        (!currentUser || numberId !== parseInt(currentUser.id)) &&
        router.pathname.includes("profile")
      ) {
        getUserInfo();
      }
    } else {
      updateUser(undefined);
      // setUserPosts(undefined);
    }
  }, [id, currentUser, router.pathname]);

  return (
    <div>
      {currentUser && <ProfileInfo user={currentUser} />}
      {/* <ProfilePosts posts = {userPosts}/> */}
    </div>
  );
}
