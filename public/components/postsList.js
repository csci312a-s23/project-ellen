import { useEffect, useState } from "react";

import { act } from "react-dom/test-utils";

function PostList({ sortingFilter }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
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
      return post.votes > 5; //need to implement this once we start scoring posts
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
            </div>
          );
          return <div key={post.id}> {post.title} </div>;
        }
      })}
    </>
  );
}

export default PostList;
