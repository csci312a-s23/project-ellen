import { knex } from "../../../../../knex/knex.js";
import nc from "next-connect";

// creating a new post
const handler = nc().post((req, res) => {
  // handle the creation of a new post

  console.log("trig");
  const {body} = req;

  console.log("incomming new post request", body);
  console.log("incomming new post request", body?.posterID);

  knex("posts")
    .insert({
      posterID: body.posterID,
      title: body?.title,
      content: body?.content,
      category: body?.category,
      created_at: new Date(),
    })
    .then(() => {
      res.json({ success: true, message: "ok" }); // respond back to request
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
