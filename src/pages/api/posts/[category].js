// function to handle returning of post
export default function handler(req, res) {
  if (req.method === "GET") {
    const { category } = req.query;

    const posts = [];

    if (!!category) {
      // get only posts in this category
    } else {
      // get all posts
    }

    res.status(200).json(posts);
  } else {
    // invalid method
    res.status(405).send("Method Not Allowed");
  }
}
