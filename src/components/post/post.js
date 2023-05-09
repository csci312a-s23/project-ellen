import PropTypes from "prop-types";

import { Typography } from "@mui/material";

// const fs = require("fs");
import { categoryColors } from "../../../data/CategoryColorData.js";

import styles from "./Post.module.css";

export default function Post({
  postInfo,
  // refreshPosts
}) {
  return (
    <div data-testid="post">
      <div className={styles.container}>
        <div className={styles.content}>
          <div
            style={{
              backgroundColor: categoryColors[postInfo.category],
              color: "black",
              padding: "2px 5px 2px 5px",
              borderRadius: "10px",
            }}
          >
            {postInfo.category}
          </div>
        </div>
        <Typography className={styles.postTitle}>{postInfo.title}</Typography>

        <Typography>{postInfo.content}</Typography>
        <div className={styles.stats}>
          <span className={styles.statsEntry}>
            # votes:
            <span data-testid="num_votes">{postInfo.num_votes}</span>
          </span>

          <span className={styles.statsEntry}>
            # comments:
            <span data-testid="num_comments">{postInfo.comments?.length}</span>
          </span>
        </div>

        {/* <Typography>{postInfo.created_at}</Typography> */}
      </div>
    </div>
  );
}
Post.propTypes = {
  postInfo: PropTypes.object,
};
