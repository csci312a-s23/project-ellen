/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  const postData = data.PostSeedData.map((entry) => {
    return { ...entry, created_at: new Date().toISOString() };
  });

  await knex("posts").del();
  await knex("posts").insert(postData);
};
