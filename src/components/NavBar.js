import styles from "../styles/NavBar.module.css";
import LoginButton from "./LoginButon";
import Link from "next/link";
export default function NavBar({ userID }) {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href={`/profile/${userID}`}>Profile</Link>
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
