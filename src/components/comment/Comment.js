export default function Comment({ data, vote }) {
  return (
    <div data-testid="comment">
      <p>{data.content}</p>
      <p>likes: {data.newVoteSum}</p>
      <div onClick={() => vote("upvote", data.id)}> upvote </div>
      <div onClick={() => vote("downvote", data.id)}> downvote </div>
    </div>
  );
}
