import createKnex from "knex";
import knexConfig from "../knexfile";

/**
 * Global is used here to ensure the connection is cached across hot-reloads in development. The approach
 * is adapted from: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

const globalForKnex = global;

export const knex =
  globalForKnex.knex ||
  createKnex(
    knexConfig[process.env.KNEX_ENV || process.env.NODE_ENV || "development"]
  );

if (process.env.NODE_ENV !== "production") globalForKnex.knex = knex;
