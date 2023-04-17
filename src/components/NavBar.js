import styles from "../styles/NavBar.module.css";
import Link from "next/link";
export default function NavBar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">Home</Link>
      </li>

      <li>
        <Link href="/profile">Profile</Link>
      </li>

      <li>
        <Link href="/post">Post</Link>
      </li>

      <li>
        <Link href="/posts">Feed</Link>
      </li>
    </ul>
  );
}
