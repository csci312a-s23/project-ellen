// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
// import PostList from "../../public/components/postsList";

// const inter = Inter({ subsets: ["latin"] });

import NavBar from "@/components/Navbar";

export default function Home({ handleClick }) {
  return (
    <>
      Index
      {/* <PostList /> */}
      <NavBar handleClick={handleClick} />
    </>
  );
}
