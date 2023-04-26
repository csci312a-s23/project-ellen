/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert([
    {
      title: "title1",
      posterID: 1,
      content: "content1",
      num_votes: 0,
      category: "school",
      created_at: new Date().toISOString(),
    },
    {
      title: "title2",
      posterID: 2,
      content: "content2",
      num_votes: 10,
      category: "food",
      created_at: new Date().toISOString(),
    },
  ]);
};
