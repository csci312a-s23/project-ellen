import { useState } from "react";
import PostCreator from "@/components/post/PostCreator";
import FilterBar from "@/components/homepage/filterBar";
import PostList from "@/components/homepage/postsList";

import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Container = styled("div")({
  display: "flex",
  width: "40%",
  flexDirection: "column",
  margin: "2%",
  marginLeft: "20%",
});

export default function Home({ posts, refreshPosts }) {
  const [currentSortFilter, setCurrentSortFilter] = useState("new");

  //handles filter change
  const changeSortFilter = (newFilter) => {
    setCurrentSortFilter(newFilter);
  };

  return (
    <div>
      <Typography variant="h2" align="center">
        Feed
      </Typography>
      <Container>
        <FilterBar
          currentSortFilter={currentSortFilter}
          setCurrentSortFilter={changeSortFilter}
        />
        <PostList
          posts={posts}
          sortingFilter={currentSortFilter}
          refreshPosts={refreshPosts}
        />
        <PostCreator refresh={refreshPosts} />
      </Container>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  refreshPosts: PropTypes.func,
};
