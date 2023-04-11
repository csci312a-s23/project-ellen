// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
//import PostList from "../../public/components/postsList";

import { useRouter } from "next/router";
import { useState } from "react";
import FilterBar from "../../public/components/filterBar";
import PostList from "../../public/components/postsList";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [currentFilter, setCurrentFilter] = useState("new");

  //handles filter change
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const createPostClick = () => {
    router.push("/createPost"); // or something
  };

  const profileClick = () => {
    router.push("/profile"); // or something
  };

  return (
    <>
      <FilterBar
        currentFilter={currentFilter}
        setCurrentFilter={changeFilter}
      />
      <PostList currentFilter={currentFilter} />
      <button onClick={createPostClick}>Make Post</button>
      <button onClick={profileClick}>Profile</button>
    </>
  );
}
