/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("votes").del();
  await knex("votes").insert([
    {
      voterID: 1,
      postID: 1,
      value: 3,
    },
  ]);
};
