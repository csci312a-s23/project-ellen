import Comment from "./Comment";
import NewComment from "./NewComment";

export default function CommentsList({ postID, comments, getComments }) {
  const addComment = (comment) => {
    fetch(`/api/posts/${postID}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postID,
        commenterID: "1",
        content: comment,
      }),
    });
    getComments();
  };

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

  return (
    <div>
      {commentBlocks}
      <NewComment addComment={addComment} />
    </div>
  );
}
