import Comment from "./Comment";

export default function CommentsList({ comments, vote }) {
  let commentBlocks = <div> NO comments </div>;
  if (comments.length > 0) {
    commentBlocks = comments.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment data={comment} vote={vote} />
        </div>
      );
    });
  }

  return <div>{commentBlocks}</div>;
}
