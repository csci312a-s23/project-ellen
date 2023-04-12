const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  const userData = data.UserSeedData.map((entry) => {
    return { ...entry, created_at: new Date().toISOString() };
  });

  await knex("users").del();
  await knex("users").insert(userData);
};
