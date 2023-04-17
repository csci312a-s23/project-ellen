import nc from "next-connect";
import Posts from "../../../../../models/Posts";
import Users from "../../../../../models/Users";

const handler = nc().get(async (req, res) => {
  // get all posts associated with a given user

  const { id } = req.query;
  if (!!id) {
    // check if the user exists:
    await Users.query()
      .findById(parseInt(id))
      .first()
      .throwIfNotFound({
        message: `user with id ${id} not found... cannot retrieve posts`,
      });

    // if the user exists- fetch the comments
    const comments = await Posts.query()
      .where({ posterId: parseInt(id) })
      .throwIfNotFound({ message: "No posts associated with this user" });
    if (!!comments) {
      res.status(200).json(comments);
    }
  } else {
    res.status(404).end(`${id} is not valid`);
  }
});

export default handler;
