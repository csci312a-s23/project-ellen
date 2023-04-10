import { useEffect, useState } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((response) => {
        setPosts(response);
      });
  }, []);
  return (
    <>
      {posts.map((post) => {
        console.log(post);
        {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* <p>{post.created_at}</p> */}
              <p>{post.comments}</p>
            </div>
          );
          return <div key={post.id}> {post.title} </div>;
        }
      })}
    </>
  );
}

export default PostList;
