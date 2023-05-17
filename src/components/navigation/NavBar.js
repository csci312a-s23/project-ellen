import Link from "next/link";
import { useSession } from "next-auth/react";
// import MenuIcon from "@mui/icons-material/Menu";

//import LoginButton from "../LoginButon";
import ProfileIcon from "../ProfileIcon";

import BarChartIcon from "@mui/icons-material/BarChart";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.content}>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <h1 className={styles.title}>StudentDirect</h1>
        </Link>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ProfileIcon />
          {!!session && session.user.isAdmin ? (
            <Link
              href="/analytics"
              style={{ textDecoration: "none", color: "black" }}
            >
              <BarChartIcon sx={{ fontSize: 48 }} />
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
