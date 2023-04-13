const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  const commentData = data.CommentSeedData.map((entry) => {
    return { ...entry, created_at: new Date().toISOString() };
  });

  await knex("comments").del();
  await knex("comments").insert(commentData);
};
