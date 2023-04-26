import Comment from "./Comment";

export default function CommentsList({ comments }) {
  let commentBlocks = <div> NO comments </div>;
  if (comments.length > 0) {
    commentBlocks = comments.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment data={comment} />
        </div>
      );
    });
  }

  return <div>{commentBlocks}</div>;
}
