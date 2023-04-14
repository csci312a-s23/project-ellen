import styles from "../styles/Navbar.module.css";
export default function NavBar({ handleClick }) {
  return (
    <div className={styles.NavBar}>
      <input type={"button"} value="Home" onClick={() => handleClick("Home")} />
      <input type={"button"} value="Post" onClick={() => handleClick("Post")} />
      <input
        type={"button"}
        value="Profile"
        onClick={() => handleClick("Profile")}
      />
      <input type={"button"} value="Feed" onClick={() => handleClick("Feed")} />
    </div>
  );
}
