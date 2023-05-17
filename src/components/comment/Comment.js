import { Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Comment.module.css";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Comment({ data, vote, deleteComment }) {
  const [canDelete, setCanDelete] = useState(false);
  const { data: session, status } = useSession({ required: false });

  const router = useRouter();

  //additionally confirms in the backend
  //for conditionally rendering the delete comment button
  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.id === data.commenterID || !!session.user.isAdmin) {
        setCanDelete(true);
      }
    }
  }, [status, data]);

  const handleDelete = () => {
    // console.log(data);
    deleteComment(data.id, data.postID);
  };

  return (
    <div data-testid="comment">
      <Box className={styles.indivCommentContainer}>
        <Box className={styles.leftSide}>
          <Link href={`/profile/${data?.poster?.username}`}>
            {/* dont show the by: thing if on a profile page. we already know who's comment it is! */}
            {!router.pathname.includes("profile") && (
              <h3>by: {data?.poster?.username}</h3>
            )}
          </Link>
          <Link href={`/posts/${data.postID}`}>
            <div>{data.content}</div>
          </Link>
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
          {!!canDelete && <button onClick={handleDelete}>Delete</button>}
        </Box>
      </Box>
    </div>
  );
}
