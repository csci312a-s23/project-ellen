import Comment from "./Comment";

export default function CommentsContainer({ comments, vote, whereis }) {
  let commentBlocks = <div> NO comments </div>;
  if (comments.length > 0) {
    commentBlocks = comments.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment data={comment} vote={vote} whereis={whereis} />
        </div>
      );
    });
  }

  return <div>{commentBlocks}</div>;
}
