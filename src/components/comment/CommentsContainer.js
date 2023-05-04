import Link from "next/link";
import Comment from "./Comment";

export default function CommentsContainer({ comments, vote, whereis }) {
  let commentBlocks = <div> NO comments </div>;
  if (comments.length > 0) {
    commentBlocks = comments.map((comment) => {
      return (
        <div key={comment.id}>
          {(() => {
            if (whereis === "profile") {
              return (
                <Link href={`/posts/${comment.postID}`}>
                  <Comment data={comment} vote={vote} />
                </Link>
              );
            } else {
              return <Comment data={comment} vote={vote} />;
            }
          })()}
        </div>
      );
    });
  }

  return <div>{commentBlocks}</div>;
}
