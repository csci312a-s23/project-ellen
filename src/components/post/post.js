import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Link from "next/link";

export default function Post({ postInfo }) {
  const postStyle = {
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div data-testid="post">
      <Paper elevation={3} style={postStyle}>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>
          <Link href={`/posts/${postInfo.id}`} style={{ marginLeft: "5%" }}>
            {postInfo.title}
          </Link>
          <p style={{ alignSelf: "center", marginLeft: "5%" }}>
            {" "}
            {postInfo.category}{" "}
          </p>
          <p style={{ marginLeft: "auto", marginRight: "2%" }}>
            {" "}
            {postInfo.votes}{" "}
          </p>
        </div>
        <p style={{ marginLeft: "10%", marginTop: "3%", marginBottom: "2%" }}>
          {postInfo.content}
        </p>
        <p style={{ marginLeft: "80%", fontSize: "10px" }}>{postInfo.date}</p>
      </Paper>
    </div>
  );
}
Post.propTypes = {
  postInfo: PropTypes.object,
};
