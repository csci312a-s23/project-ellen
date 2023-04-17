import PropTypes from "prop-types";
function PostList({ posts, sortingFilter }) {
  let filteredPosts;

  if (posts) {
    filteredPosts = posts.filter((post) => {
      if (sortingFilter === "new") {
        return true; //returns all posts
      } else if (sortingFilter === "hot") {
        return parseInt(post.votes) > 5; //need to implement this once we start scoring posts
      }
    });
  } else {
    filteredPosts = [];
  }

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

PostList.propTypes = {
  posts: PropTypes.array,
  sortingFilter: PropTypes.oneOf(["new", "hot"]).isRequired,
};
