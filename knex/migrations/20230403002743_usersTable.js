/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("firstName");
    table.string("lastName");
    table.timestamp("created_at");
    table.string("description");
    table.enum("type", ["student", "faculty", "admin"]);
    table.enum("grade", ["freshman", "sophmore", "junior", "senior"]);
    table.json("posts");
    table.json("comments");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
