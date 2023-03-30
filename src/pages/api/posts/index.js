import { knex } from "../../../../knex/knex";

// function to handle returning all posts
export default async function handler(req, res) {
  if (req.method === "GET") {
    const posts = await knex("testTable");

    res.status(200).json(posts);
  } else {
    // invalid method
    res.status(405).send("Method Not Allowed");
  }
}
