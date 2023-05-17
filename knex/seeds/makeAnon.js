exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").insert({
    id: "51e2c13b-dfd5-4ed4-8805-f03357a3083b",
    username: "anonymous",
    email: "none",
  });
};
