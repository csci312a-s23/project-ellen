export default function Comment({ data }) {
  return (
    <div data-testid="comment">
      <p>{data.content}</p>
      <p>likes: {data.likes}</p>
    </div>
  );
}
