/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex("comments").insert([
    {
      content: "this is the response",
      parentPostID: "1",
      commenterID: "1",
      created_at: new Date(),
    },
  ]);
};
