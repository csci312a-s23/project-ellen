import PropTypes from "prop-types";
import IndividualPost from "@/components/IndividualPost";
function PostList({ posts, sortingFilter }) {
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
    <>
      {/* WE need a post id */}
      {filteredPosts.map((post) => {
        return (
          <div key={post.id}>
            <IndividualPost post={post} />
          </div>
        );
      })}
    </>
  );
}

export default PostList;

PostList.propTypes = {
  posts: PropTypes.array,
  sortingFilter: PropTypes.oneOf(["new", "hot"]).isRequired,
};
