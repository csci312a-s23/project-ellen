import { useEffect, useState } from "react";

import { act } from "@testing-library/react";

function PostList({ sortingFilter }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts/")
      .then((res) => res.json())
      .then((response) => {
        act(() => {
          setPosts(response);
        });
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (sortingFilter === "new") {
      return true; //returns all posts
    } else if (sortingFilter === "hot") {
      return post.votes > 5;
    }
  });

  return (
    <>
      {filteredPosts.map((post) => {
        {
          return (
            <div key={post.title}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p>{post.created_at}</p>
              <p>{post.category}</p>
              <p>{post.votes}</p>
            </div>
          );
        }
      })}
    </>
  );
}

export default PostList;
