/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const fs = require("fs");
const contents = fs.readFileSync("./data/newGenSeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  //await knex("votes").del();
  await knex("votes").insert(data.VoteSeedData);
};
