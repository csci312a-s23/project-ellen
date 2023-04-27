/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("votes", (table) => {
    table.increments("id").primary();
    table.uuid("voterID").references("id").inTable("users");
    table.integer("postID").references("id").inTable("posts");
    table.integer("value");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("votes");
};
