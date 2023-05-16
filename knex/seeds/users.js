/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const fs = require("fs");
//const contents = fs.readFileSync("./data/SeedData.json");
const contents = fs.readFileSync("./data/newGenSeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  const postData = data.UserSeedData.map((entry) => {
    return { ...entry };
  });

  await knex("users").del();
  await knex("users").insert(postData);
};
