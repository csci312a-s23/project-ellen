export default function IndividualPost({ post }) {
  return (
    <div data-testid="post">
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p>category: {post.category}</p>
      <p>created at: {post.created_at}</p>
      <p>votes: {post.votes}</p>
    </div>
  );
}
