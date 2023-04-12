/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "test1",
      email: "test1@test.com",
      firstName: "test1",
      lastName: "test1",
      created_at: new Date(),
      type: "student",
      classYear: 2024,
      major: "Computer Science",
    },
    {
      id: 2,
      username: "test2",
      email: "test2@test.com",
      firstName: "test2",
      lastName: "test2",
      created_at: new Date(),
      type: "student",
      classYear: 2024,
      major: "Computer Science",
    },
    {
      id: 3,
      username: "test3",
      email: "test3@test.com",
      firstName: "test3",
      lastName: "test3",
      created_at: new Date(),
      type: "faculty",
      department: "Computer Science",
      title: "Professor1",
    },
    {
      id: 4,
      username: "test4",
      email: "test4@test.com",
      firstName: "test4",
      lastName: "test4",
      created_at: new Date(),
      type: "faculty",
      department: "Computer Science",
      title: "Professor2",
    },
    {
      id: 5,
      username: "test5",
      email: "test5@test.com",
      firstName: "test5",
      lastName: "test5",
      created_at: new Date(),
      type: "administration",
      title: "Dean1",
    },
  ]);
};
