export default function IndividualPost({ post }) {
  // console.log("rendering", post);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.category}</p>
      <p>{post.created_at}</p>
    </>
  );
}
