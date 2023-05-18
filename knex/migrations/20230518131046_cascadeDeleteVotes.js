// exports.up = function (knex) {
//   return knex.schema.alterTable("votes", (table) => {
//     table.integer("postID").references("id").inTable("posts").onDelete("CASCADE").alter()
//   });
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function (knex) {
//   return knex.schema.table("votes", (table) => {
//     table.dropColumn("postID");
//   });
// };
