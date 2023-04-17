import nc from "next-connect";
import Comments from "../../../../../models/Comments";
import Users from "../../../../../models/Users";

const handler = nc().get(async (req, res) => {
  // get all comments associated with a given user

  const { id } = req.query;
  if (!!id) {
    // check if the user exists:
    await Users.query()
      .findById(parseInt(id))
      .first()
      .throwIfNotFound({
        message: `user with id ${id} not found... cannot retrieve comments`,
      });

    // if the user exists- fetch the comments
    const comments = await Comments.query()
      .where({ commenterID: parseInt(id) })
      .throwIfNotFound({ message: "No comments associated with this user" });
    if (!!comments) {
      res.status(200).json(comments);
    }
  } else {
    res.status(404).end(`${id} is not valid`);
  }
});

export default handler;
