import { useRouter } from "next/router";
import EditForm from "../../../components/profile/editForm";

export default function EditProfile() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <h1>Edit profile</h1>
      <EditForm username={username} />
    </div>
  );
}
