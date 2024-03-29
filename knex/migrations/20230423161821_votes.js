/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("votes", (table) => {
    table.increments("id").primary();
    table.uuid("voterID").references("id").inTable("users");
    table.integer("postID").references("id").inTable("posts");
    table.integer("commentID").references("id").inTable("comments");
    table.integer("value");
    table.text("typeOf");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("votes");
};
