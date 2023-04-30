import PropTypes from "prop-types";
import Post from "@/components/post/post.js";

function PostList({ posts, sortingFilter, refreshPosts }) {
  let filteredPosts;

  if (posts) {
    filteredPosts = posts.filter((post) => {
      if (sortingFilter === "new") {
        return true; //returns all posts
      } else if (sortingFilter === "hot") {
        //sort by date
        return parseInt(post.votes) > 5; //need to implement this once we start scoring posts
      }
    });
  } else {
    filteredPosts = [];
  }

  filteredPosts.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div style={{ width: "100%", margin: "5% 0 5% 0" }}>
      {filteredPosts.map((post) => {
        return (
          <div key={post.id} style={{ marginBottom: "2%" }}>
            <Post postInfo={post} refreshPosts={refreshPosts} />
          </div>
        );
      })}
    </div>
  );
}

export default PostList;

PostList.propTypes = {
  posts: PropTypes.array,
  sortingFilter: PropTypes.oneOf(["new", "hot"]).isRequired,
};
