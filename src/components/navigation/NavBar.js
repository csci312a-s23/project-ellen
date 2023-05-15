import Link from "next/link";
//import { useSession } from "next-auth/react";
// import MenuIcon from "@mui/icons-material/Menu";

//import LoginButton from "../LoginButon";
import ProfileIcon from "../ProfileIcon";

import styles from "./NavBar.module.css";

export default function NavBar() {
  //const { data: session } = useSession();

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.content}>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <h1 className={styles.title}>StudentDirect</h1>
        </Link>

        <ProfileIcon />
      </div>
    </div>
  );
}
