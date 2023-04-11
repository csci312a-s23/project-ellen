import nc from "next-connect";
import Comment from "../../../../models/Comments";

const handler = nc().get(async (req, res) => {
  console.log("function call");
  const comment = await Comment.query()
    .findById(req.query.id)
    .throwIfNotFound();
  res.status(200).json(comment);
});

/*.put(async (req, res) => {
    // do we want to enable comment editing?
    const { id, ...updatedComment } = req.body;
    if (id !== parseInt(req.query.id, 10)) {
      res.status(400).end(`URL and object does not match`);
      return;
    }
    const comment = await Comment.query()
      .updateAndFetchById(req.query.id, updatedComment)
      .throwIfNotFound();
    res.status(200).json(comment);
  })*/ export default handler;
