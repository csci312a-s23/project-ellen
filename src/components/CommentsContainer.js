import Comment from "./Comment";
import NewComment from "./NewComment";

export default function CommentsList({ comments, setComments }) {
  const addComment = (comment) => {
    const newComments = [
      ...comments,
      {
        id: comments[comments.length - 1].id + 1,
        commenterID: 2,
        content: comment,
        likes: 0,
      },
    ];

    setComments(newComments);
  };
  const commentBlocks = comments.map((comment) => {
    return (
      <div key={comment.id}>
        <Comment data={comment} />
      </div>
    );
  });

  return (
    <div>
      {commentBlocks}
      <NewComment addComment={addComment} />
    </div>
  );
}
