// import PropTypes from "prop-types";
import ProfileInfo from "../../components/ProfileInfo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Profile() {
  const router = useRouter();

  const [currentUser, updateUser] = useState();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const numberId = parseInt(id);
      const getUserInfo = async () => {
        const response = await fetch(`/api/user/${numberId}`);
        if (response.ok) {
          const fetchedUserInfo = await response.json();
          updateUser(fetchedUserInfo);
        }
      };

      if (!currentUser || numberId !== parseInt(currentUser.id)) {
        getUserInfo();
      }
    } else {
      updateUser(undefined);
    }
  }, [id, currentUser]);

  return <ProfileInfo user={currentUser} />;
}
