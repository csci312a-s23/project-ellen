/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex("comments").insert([
    {
      id: 1,
      commenterID: 1,
      postID: 1,
      content: "content1",
      likes: 0,
      created_at: new Date(),
    },
    {
      id: 2,
      commenterID: 2,
      postID: 2,
      content: "content2",
      likes: 0,
      created_at: new Date(),
    },
  ]);
};
