import styles from "../styles/NavBar.module.css";
import LoginButton from "./LoginButon";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        {session && <Link href={`/profile/${session.user.name}`}>Profile</Link>}
      </li>

      <li>
        <Link href="/post">Post</Link>
      </li>

      <li>
        <Link href="/posts">Feed</Link>
      </li>
      <li>
        <LoginButton />
      </li>
    </ul>
  );
}
