// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
//import PostList from "../../public/components/postsList";

import PostCreator from "@/components/newPost/PostCreator";
import { useState } from "react";
import FilterBar from "../../public/components/filterBar";
import PostList from "../../public/components/postsList";

import PropTypes from "prop-types";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ posts, refreshPosts }) {
  const [currentSortFilter, setCurrentSortFilter] = useState("new");

  //handles filter change
  const changeSortFilter = (newFilter) => {
    setCurrentSortFilter(newFilter);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "40%",
        flexDirection: "column",
        alignItems: "center",
        margin: "2%",
      }}
    >
      <FilterBar
        currentSortFilter={currentSortFilter}
        setCurrentSortFilter={changeSortFilter}
      />
      <PostList posts={posts} sortingFilter={currentSortFilter} />
      <PostCreator refresh={refreshPosts} />
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
  refreshPosts: PropTypes.func,
};
