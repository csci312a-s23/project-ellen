import nc from "next-connect";
import Comments from "../../../../../models/Comments";
import Posts from "../../../../../models/Posts";

const handler = nc()
  .get(async (req, res) => {
    // get all comments associated with a given post

    const { id } = req.query;
    if (!!id) {
      // check if the post exists:
      await Posts.query()
        .findById(parseInt(id))
        .first()
        .throwIfNotFound({
          message: `Post with id ${id} not found... cannot retrieve comments`,
        });

      // if the post exists- fetch the comments
      const comments = await Comments.query()
        .where({ postID: parseInt(id) })
        .throwIfNotFound({ message: "No comments associated with this post" });

      res.status(200).json(comments);
    } else {
      res.status(404).end(`${id} is not valid`);
    }
  })
  .post(async (req, res) => {
    // post a new comment to a given post
    const { id } = req.query;
    const newComment = req.body;
    // we want to automatically assign a new comment ID
    const maxId = await Comments.query().max("id");

    const comment = await Comments.query().insertAndFetch({
      id: parseInt(maxId[0]["max(`id`)"]) + 1,
      postID: parseInt(id),
      commenterID: newComment.commenterID,
      content: newComment.content,

      likes: 0,
      created_at: new Date().toISOString(),
    });
    res.status(200).json(comment);
  });

export default handler;
