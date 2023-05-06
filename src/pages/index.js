// import { useState } from "react";
import PostCreator from "@/components/post/PostCreator";
import PostList from "@/components/homepage/postsList";

import PropTypes from "prop-types";

// import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export default function Home({
  posts,
  refreshPosts,
  currentSortFilter,
  // changeSortFilter
}) {
  return (
    <div
      style={{
        paddingTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" align="center">
        Feed
      </Typography>
      <div style={{ width: "80%" }}>
        <PostList
          posts={posts}
          sortingFilter={currentSortFilter}
          refreshPosts={refreshPosts}
        />
        <PostCreator refresh={refreshPosts} />
      </div>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  refreshPosts: PropTypes.func,
};
