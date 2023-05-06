import Link from "next/link";
import { useSession } from "next-auth/react";
// import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./LoginButon";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <div
      style={{
        display: "flex",
        flexShrink: "0",
        flexDirection: "row",
        justifyContent: "center",
        width: "250px",
        // paddingRight: "100px",
        borderRight: "1px solid lightgrey ",
      }}
    >
      <div
        style={{
          display: "absolute",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "100px",
          paddingBottom: "200px",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <h1 style={{ fontsize: "30px" }}>StudentDirect</h1>
        </Link>

        {session && (
          <Link
            href={`/profile/${session.user.name}`}
            style={{ textDecoration: "none" }}
          >
            <h2 style={{ fontsize: "20px" }}>profile</h2>
          </Link>
        )}

        <Link href="/" style={{ textDecoration: "none" }}>
          <h2 style={{ fontsize: "20px" }}>make post</h2>
        </Link>

        <LoginButton />
      </div>
    </div>
  );
}
