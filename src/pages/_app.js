import "@/styles/globals.css";

import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const handleClick = (command) => {
    if (command === "Home") {
      router.push("./");
    } else if (command === "Profile") {
      router.push("./profile");
    } else if (command === "Post") {
      router.push("./post");
    } else if (command === "Feed") {
      router.push("./posts");
    }
  };

  const props = {
    ...pageProps,
    handleClick: handleClick,
  };

  return <Component {...props} />;
}
