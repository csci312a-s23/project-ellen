import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [currentPost, setCurrentPostState] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const id = +router.query.id;

  const refreshPosts = () => {
    fetch(`/api/posts`)
      .then((res) => res.json())
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => console.log(error));
  };

  const setCurrentPost = (post) => {
    if (post != null) {
      router.push(`/posts/${post.id}`);
      setCurrentPostState(post);
    } else {
      setCurrentPostState(null);
    }
  };

  useEffect(() => {
    if (!id) {
      setCurrentPostState(null);
    } else if (
      (!currentPost || currentPost.id !== parseInt(id)) &&
      router.pathname.includes("posts")
    ) {
      fetch(`/api/posts/${parseInt(id)}`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response)
          setCurrentPostState(response);
        })
        .catch((error) => console.log(error));
    }
  }, [id, currentPost, router.pathname]);

  useEffect(() => {
    refreshPosts();
  }, []);

  const props = {
    ...pageProps,
    currentPost,
    setCurrentPost,
    refreshPosts,
    posts,
  };

  // TO TEST, I PUT USERID = 1 BELOW
  // WHEN WE HAVE AUTHORIZATION, WE CAN SWITCH WITH CURRENT USER ID

  return (
    <SessionProvider session={session}>
      <div>
        <NavBar />

        <Component {...props} />
      </div>
    </SessionProvider>
  );
}
