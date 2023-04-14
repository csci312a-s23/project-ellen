// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
// import PostList from "../../public/components/postsList";

import PostCreator from "../components/newPost/PostCreator.js";
// const inter = Inter({ subsets: ["latin"] });

import NavBar from "@/components/NavBar.js";

export default function Home({ handleClick }) {
  return (
    <>
      Index
      <PostCreator />
      <NavBar handleClick={handleClick} />
      {/* <PostList /> */}
    </>
  );
}
