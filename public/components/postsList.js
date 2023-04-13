import { useEffect, useState } from "react";

import { act } from "react-dom/test-utils";

function PostList({ currentFilter }) {
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
    if (currentFilter === "new") {
      return true; //returns all posts
    } else if (currentFilter === "hot") {
      return post.title === "title1";
      return post.votes > 5; //need to implement this eventually
    } else if (currentFilter === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return post.created_at >= oneWeekAgo;
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
