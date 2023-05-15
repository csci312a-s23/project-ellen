/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").where("email", "=", "aballo@middlebury.edu").update({
    isAdmin: true,
  });
};
