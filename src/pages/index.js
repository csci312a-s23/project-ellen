import { useState } from "react";
import PostCreator from "@/components/post/PostCreator";
import FilterBar from "@/components/homepage/filterBar";
import PostList from "@/components/homepage/postsList";

import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";

const Container = styled("div")({
  display: "flex",
  width: "40%",
  flexDirection: "column",
  alignItems: "center",
  margin: "2%",
});

export default function Home({ posts, refreshPosts }) {
  const [currentSortFilter, setCurrentSortFilter] = useState("new");

  //handles filter change
  const changeSortFilter = (newFilter) => {
    setCurrentSortFilter(newFilter);
  };

  return (
    <div>
      <Container>
        <FilterBar
          currentSortFilter={currentSortFilter}
          setCurrentSortFilter={changeSortFilter}
        />
        <PostList posts={posts} sortingFilter={currentSortFilter} />
      </Container>
      <PostCreator refresh={refreshPosts} />
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  refreshPosts: PropTypes.func,
};
