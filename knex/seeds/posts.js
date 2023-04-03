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
      content: "content1",
      category: "school",
      created_at: new Date(),
      comments: "[1]",
    },
    {
      title: "title2",
      content: "content2",
      category: "food",
      created_at: new Date(),
    },
  ]);
};
