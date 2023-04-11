import nc from "next-connect";
import Posts from "../../../../../models/Posts.js";
// creating a new post
const handler = nc().post(async (req, res) => {
  // handle the creation of a new post

  console.log("trig");
  const { body } = req;

  console.log("incomming new post request", body);
  console.log("incomming new post request", body?.posterID);

  const post = await Posts.query()
    .insertAndFetch({
      posterID: body.posterID,
      title: body?.title,
      content: body?.content,
      category: body?.category,
      created_at: new Date().toISOString(),
    })
    .then(() => {
      res.status(200).json(post);
    });
});

export default handler;

/* 
 *
  fetch('/api/posts/new', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({"posterID": "1111", "title":"cool title", "content":"content body"}),
})

*/
