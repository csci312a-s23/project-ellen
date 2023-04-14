export default function IndividualPost({ post }) {
  // console.log("rendering", post);

  return (
    <>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>category: {post.category}</p>
      <p>created at: {post.created_at}</p>
      <p>votes: {post.votes}</p>
    </>
  );
}
