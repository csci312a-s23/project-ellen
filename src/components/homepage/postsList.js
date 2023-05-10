import PropTypes from "prop-types";
import Post from "@/components/post/post.js";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const Container = styled("div")({
  // width: "150%",
  margin: "5% 0 5% 0",
  // align: "center",
});

const PostContainer = styled("div")({
  marginBottom: "2%",
});

function PostList({ posts, sortingFilter, refreshPosts }) {
  let filteredPosts;

  if (posts) {
    filteredPosts = posts.filter((post) => {
      if (sortingFilter === "new" || sortingFilter === "All") {
        return true; //returns all posts
      } else if (sortingFilter === "hot") {
        //sort by date
        return parseInt(post.num_votes) > 5; //need to implement this once we start scoring posts
      } else {
        return post.category === sortingFilter;
      }
    });
  } else {
    filteredPosts = [];
  }

  filteredPosts.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <Container>
      {filteredPosts.map((post) => {
        return (
          <PostContainer key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Post postInfo={post} refreshPosts={refreshPosts} />
            </Link>
          </PostContainer>
        );
      })}
    </Container>
  );
}

export default PostList;

PostList.propTypes = {
  posts: PropTypes.array,
  sortingFilter: PropTypes.oneOf([
    "new",
    "hot",
    "All",
    "Academics",
    "Athletics",
    "Social",
    "Professors",
    "Housing",
    "Dining",
    "Other",
  ]),
};
