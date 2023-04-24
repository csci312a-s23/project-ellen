import nc from "next-connect";
import { onError } from "../../../lib/middleware";
import User from "../../../../models/Users";

//this endpoint is functionally deprecated by the /auth/[...nextauth] endpoint and should be used for testing only
const handler = nc({ onError })
  //create new user
  .post(async (req, res) => {
    const { body } = req;

    //validate body
    if (!body) {
      res.status(400).end("Need User Data");
      return;
    }
    if (!body.username) {
      res.status(400).end("Need Username");
      return;
    }
    if (!body.email) {
      res.status(400).end("Need Email");
      return;
    }

    //reject if user already exists
    const userExists = await User.query().findOne({
      username: body?.username,
      email: body?.email,
    });
    if (userExists) {
      res.status(400).end("User Already Exists");
      return;
    }

    const newUser = await User.query().insertAndFetch({
      username: body?.username,
      email: body?.email,
      firstName: body?.firstName,
      lastName: body?.lastName,
      type: body?.type,
      classYear: body?.classYear,
      major: body?.major,
      department: body?.department,
      title: body?.title,
    });
    return res.status(200).json(newUser);
  });

export default handler;
