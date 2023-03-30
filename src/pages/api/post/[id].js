// interaciton with post based on id
export default function handler(req, res) {
  if (req.method === "GET") {
    // return [id] post
    let post;

    res.status(200).json(post);
  } else if (req.method === "PUT") {
    // update [id] post

    let post;

    // update post stuff

    res.status(200).json(post);
  } else {
    // invalid method
    res.status(405).send("Method Not Allowed");
  }
}
