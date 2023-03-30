// creating a new post
export default function handler(req, res) {
  if (req.method === "POST") {
    // handle the creation of a new post

    const body = JSON.parse(req.body);

    const newPost = {
      // newPost stuff
      title: body.title,
      description: body.description,
      // etc
    };

    res.status(200).json(newPost);
  } else {
    // invalid method
    res.status(405).send("Method Not Allowed");
  }
}
