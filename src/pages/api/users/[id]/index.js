import nc from "next-connect";
import Users from "../../../../../models/Users";

const handler = nc().get(async (req, res) => {
  // get all comments associated with a given user

  const { id } = req.query;
  if (!!id) {
    // check if the user exists:
    const user = await Users.query()
      .findById(parseInt(id))
      .first()
      .throwIfNotFound({
        message: `user with id ${id} not found...`,
      });

    res.status(200).json(user);
  } else {
    res.status(404).end(`${id} is not valid`);
  }
});

export default handler;
