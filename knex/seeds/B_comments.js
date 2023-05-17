const fs = require("fs");
//const contents = fs.readFileSync("./data/SeedData.json");
const contents = fs.readFileSync("./data/newGenSeedData.json");
const data = JSON.parse(contents);

exports.seed = async function (knex) {
  const commentData = data.CommentSeedData.map((entry) => {
    return { ...entry };
  });

  //await knex("comments").del();
  await knex("comments").insert(commentData);
};
