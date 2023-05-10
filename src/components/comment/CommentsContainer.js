import Link from "next/link";
import Comment from "./Comment";

export default function CommentsContainer({
  comments,
  vote,
  whereis,
  deleteComment,
}) {
  let commentBlocks = <div> NO comments </div>;

  if (comments.length > 0) {
    commentBlocks = comments.map((comment) => {
      return (
        <div key={comment.id}>
          {(() => {
            if (whereis === "profile") {
              return (
                <Link href={`/posts/${comment.postID}`}>
                  <Comment
                    data={comment}
                    vote={vote}
                    deleteComment={deleteComment}
                  />
                </Link>
              );
            } else {
              return (
                <Comment
                  data={comment}
                  vote={vote}
                  deleteComment={deleteComment}
                />
              );
            }
          })()}
        </div>
      );
    });
  }

  return <div>{commentBlocks}</div>;
}
