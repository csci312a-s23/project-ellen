import nc from "next-connect";
import Users from "../../../../models/Users";

const handler = nc().get(async (req, res) => {
  // get all comments associated with a given post

  const users = await Users.query();
  res.status(200).json(users);
});

export default handler;
