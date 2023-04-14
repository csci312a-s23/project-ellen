import nc from "next-connect";
import User from "../../../../models/Users";

const handler = nc()
  //return user by id
  .get(async (req, res) => {
    const { id } = req.query;

    const user = await User.query().findById(id).throwIfNotFound();

    res.status(200).json(user);
  })
  //update user by id
  .put(async (req, res) => {
    const { id } = req.query;
    const { body } = req;

    //validate body
    if (!body) {
      res.status(500).end("Need Body");
      return;
    }
    if (!body.username) {
      res.status(500).end("Need Username");
      return;
    }
    if (!body.email) {
      res.status(500).end("Need Email");
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
