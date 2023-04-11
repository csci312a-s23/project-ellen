import nc from "next-connect";
import Comment from "../../../../models/Comments";

const handler = nc({ onError })
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
    const { id, ...updatedComment } = req.body;
    const comments = await Comment.query().insertAndFetch(updatedComment);
    res.status(200).json(comments);
  });

export default handler;
