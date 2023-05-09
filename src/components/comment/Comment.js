import { Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Comment.module.css";

export default function Comment({ data, vote }) {
  return (
    <div data-testid="comment">
      <Box className={styles.indivCommentContainer}>
        <Box className={styles.leftSide}>
          <h3>by: {data?.poster?.username}</h3>
          <div>{data.content}</div>
        </Box>

        <Box className={styles.rightSide}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => vote("upvote", data.id, data.postID)}
          >
            {" "}
            <KeyboardArrowUpIcon />{" "}
          </div>
          <p>likes: {data.likes}</p>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => vote("downvote", data.id, data.postID)}
          >
            {" "}
            <KeyboardArrowDownIcon />{" "}
          </div>
        </Box>
      </Box>
    </div>
  );
}
