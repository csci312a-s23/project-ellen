const { loadEnvConfig } = require("@next/env");

// Adapted from NextJS knex example
const dev = process.env.NODE_ENV !== "production";
const { DATABASE_URL } = loadEnvConfig("./", dev).combinedEnv;

const defaultSettings = {
  migrations: {
    directory: "./knex/migrations",
  },
  seeds: {
    directory: "./knex/seeds",
  },
};

module.exports = {
  development: {
    ...defaultSettings,
    client: "sqlite3",
    connection: {
      filename: "./ellen.db",
    },
    useNullAsDefault: true,
  },

  production: {
    ...defaultSettings,
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
  },
};
