// import { useState } from "react";
import PostCreator from "@/components/post/PostCreator";
import PostList from "@/components/homepage/postsList";

import PropTypes from "prop-types";

// import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import FilterBar from "@/components/homepage/filterBar";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({
  posts,
  refreshPosts,
  setUnauthorized,
  setAuthMessage,
}) {
  const [currentSortFilter, setCurrentSortFilter] = useState("new");

  //handles filter change
  const changeSortFilter = (newFilter) => {
    setCurrentSortFilter(newFilter);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h2" align="center">
        Feed
      </Typography>
      <FilterBar
        currentSortFilter={currentSortFilter}
        setCurrentSortFilter={changeSortFilter}
      />
      <div style={{ width: "80%" }}>
        <PostList
          posts={posts}
          sortingFilter={currentSortFilter}
          refreshPosts={refreshPosts}
        />
        <PostCreator
          refresh={refreshPosts}
          setUnauthorized={setUnauthorized}
          setAuthMessage={setAuthMessage}
        />
      </div>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  refreshPosts: PropTypes.func,
};
