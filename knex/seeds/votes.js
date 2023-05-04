/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/*exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("votes").del();
  await knex("votes").insert([
    {
      voterID: 1,
      postID: 1,
      value: 3,
    },
  ]);
};*/

const fs = require("fs");
//const contents = fs.readFileSync("./data/SeedData.json");
const contents = fs.readFileSync("./data/newGenSeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  const postData = data.VoteSeedData.map((entry) => {
    return { ...entry };
  });

  await knex("votes").del();
  await knex("votes").insert(postData);
};
