import Comment from "./Comment";

export default function CommentsContainer({ comments, vote, deleteComment }) {
  let commentBlocks = <div> NO comments </div>;
  //https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
  const orderedComments = [...comments].sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    } else {
      return 0;
    }
  });
  // console.log("og", comments, "new", orderedComments)

  commentBlocks =
    comments.length > 0 ? (
      orderedComments.map((comment) => {
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
