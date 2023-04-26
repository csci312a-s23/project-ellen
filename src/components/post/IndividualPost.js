import Link from "next/link";

export default function IndividualPost({ post }) {
  return (
    <div data-testid="post">
      <p style={{ color: "blue" }}>
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </p>
      <p>{post.content}</p>
      <p>category: {post.category}</p>
      <p>created at: {post.created_at}</p>
      <p>votes: {post.votes}</p>
    </div>
  );
}
