/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Add foreign keys to posts table and comments table
  return knex.schema
    .alterTable("posts", (table) => {
      table.uuid("posterID").references("id").inTable("users");
    })
    .alterTable("comments", (table) => {
      table.uuid("commenterID").references("id").inTable("users");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Remove foreign keys from posts table and comments table
  return knex.schema
    .alterTable("posts", (table) => {
      table.dropForeign("userID");
    })
    .alterTable("comments", (table) => {
      table.dropForeign("userID");
    });
};
