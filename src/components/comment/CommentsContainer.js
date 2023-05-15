import Comment from "./Comment";

export default function CommentsContainer({ comments, vote, deleteComment }) {
  let commentBlocks = <div> NO comments </div>;

  commentBlocks =
    comments.length > 0 ? (
      comments.map((comment) => {
        return (
          <div key={comment.id}>
            <Comment data={comment} vote={vote} deleteComment={deleteComment} />
          </div>
        );
      })
    ) : (
      <div> NO comments </div>
    );

  return <div>{commentBlocks}</div>;
}
