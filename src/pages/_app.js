import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

// import Link from "next/link";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "@/material/theme";
import createEmotionCache from "@/material/createEmotionCache";
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
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
  // console.log(session);

  // TO TEST, I PUT USERID = 1 BELOW
  // WHEN WE HAVE AUTHORIZATION, WE CAN SWITCH WITH CURRENT USER ID

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Project-Ellen</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <main>
          <SessionProvider session={session}>
            <NavBar />
            <Container>
              <Component {...props} />
            </Container>
          </SessionProvider>
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}
