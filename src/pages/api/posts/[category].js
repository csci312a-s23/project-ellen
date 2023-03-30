import { knex } from "../../../../knex/knex";

// function to handle returning posts within category
export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("called");

    const { category } = req.query;

    const posts = await knex("testTable").where({ category: category });

    res.status(200).json(posts);
  } else {
    // invalid method
    res.status(405).send("Method Not Allowed");
  }
}
