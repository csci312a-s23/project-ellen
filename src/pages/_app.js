import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [currentPost, setCurrentPostState] = useState(null);
  const router = useRouter();
  const id = +router.query.id;

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
    } else if (!currentPost || currentPost.id !== parseInt(id)) {
      fetch(`/api/posts/${parseInt(id)}`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response)
          setCurrentPostState(response);
        })
        .catch((error) => console.log(error));
    }
  }, [id, currentPost]);

  const props = {
    ...pageProps,
    currentPost,
    setCurrentPost,
  };

  return (
    <div>
      <NavBar />

      <Component {...props} />
    </div>
  );
}
