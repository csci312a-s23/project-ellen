import { useEffect, useState } from "react";

function PostList({ currentFilter }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((response) => {
        setPosts(response);
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (currentFilter === "new") {
      return true; //returns all posts
    } else if (currentFilter === "hot") {
      return post.title === "title1";
      return post.votes > 5; //need to implement this eventually
    } else if (currentFilter === "recent") {
      const cutOff = new Date();
      cutOff.setDate(cutOff.getDate() - 7); //set to a week ago
      return post.created_at >= cutOff;
    }
  });

  return (
    <>
      {filteredPosts.map((post) => {
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
