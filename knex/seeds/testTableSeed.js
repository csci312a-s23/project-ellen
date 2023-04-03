/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("testTable").del();
  await knex("testTable").insert([
    { title: "title1", description: "desc1", category: "classes" },
    { title: "title2", description: "desc2", category: "classes" },
    { title: "title3", description: "desc2", category: "dining" },
  ]);
};
