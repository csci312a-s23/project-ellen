/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const fs = require("fs");
//const contents = fs.readFileSync("./data/SeedData.json");
const contents = fs.readFileSync("./data/newGenSeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  const postData = data.PostSeedData.map((entry) => {
    return { ...entry };
  });

  await knex("posts").del();
  await knex("posts").insert(postData);
};
