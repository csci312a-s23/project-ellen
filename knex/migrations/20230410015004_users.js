/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table.string("username");
    table.string("email");
    table.string("firstName");
    table.string("lastName");
    table.timestamp("created_at");
    table.enum("type", ["Student", "Faculty", "Administration"]);
    table.integer("classYear");
    table.string("major");
    table.string("department");
    table.string("title");
    // table.boolean("isAdmin").defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
