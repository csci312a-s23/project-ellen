import nc from "next-connect";
import Comment from "../../../../models/Comments";

const handler = nc()
  .get(async (req, res) => {
    let query = Comment.query();
    if (req.query.section) {
      query = query.whereRaw("UPPER(SUBSTRING(title, 1, 1)) = ?", [
        req.query.section,
      ]);
    }
    const comments = await query;
    res.status(200).json(comments);
  })

  .post(async (req, res) => {
    const newComment = req.body;
    const comment = await Comment.query().insertAndFetch({
      id: newComment?.id,
      commenterID: newComment.commenterID,
      postID: newComment.postID,
      title: newComment?.title,
      content: newComment.content,
      created_at: new Date().toISOString(),
    });
    res.status(200).json(comment);
  });

export default handler;
