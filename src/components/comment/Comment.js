export default function Comment({ data }) {
  return (
    <div>
      <p>{data.content}</p>
      <p>likes: {data.likes}</p>
    </div>
  );
}
