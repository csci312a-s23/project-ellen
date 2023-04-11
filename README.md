# Student Direct

Student Direct is web application that allows optionally anonymous users to post and interact with comments regarding issues pertaining to college life. Students, faculty, and administrators can all participate. Student Direct provides students with a direct, effortless, and straightforward line of communciation to the people positioned to make real changes on campus that can genuinely improve student life.

![workflow status](https://github.com/csci312a-s23/project-ellen/actions/workflows/node.js.yml/badge.svg)

[Link to application](https://student-direct.fly.dev/)

## Running the Database

Make sure that Knex, SQLite3, and PostgreSQL are installed. Run

```sh
npm install --save knex sqlite pg
```

if needed.

Run

```sh
npx knex migrate:latest --env development
```

to set up the database for loading data.
To load in the testing data run

```sh
npx knex seed:run --env development
```

to load the testing data into the database
Please update the seed data fornd in the `./knex/seeds/` directory as needed for testing purposes.
