import nc from "next-connect";
import User from "../../../../../models/Users";
import { onError } from "../../../../lib/middleware";
import { authenticated } from "../../../../lib/middleware";
import { getUserIdFromUsername } from "../../../../lib/middleware";

const handler = nc({ onError })
  //return user by id
  .get(async (req, res) => {
    const { username } = req.query;
    const user = await User.query()
      .findOne("username", username)
      .throwIfNotFound();
    res.status(200).json(user);
  })
  //update user by id
  .put(authenticated, async (req, res) => {
    const id = await getUserIdFromUsername(req.query);
    const { body } = req;

    //only the user is allowed to update their own profile

    const requestingUser = req.user;
    const changedUser = await User.query().findById(id).throwIfNotFound();
    if (requestingUser.id !== changedUser.id) {
      res.status(401).end("Unauthorized");
      return;
    }

    //validate body
    if (!body) {
      res.status(400).end("Need Body");
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

    const updatedUser = await User.query().patchAndFetchById(id, {
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
    return res.status(200).json(updatedUser);
  });

export default handler;
