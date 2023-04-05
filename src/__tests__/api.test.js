import { testApiHandler } from "next-test-api-route-handler";
import posts_endpoint from "../pages/api/posts/index.js";
import individualPost_endpoint from "../pages/api/posts/[id].js";
import { knex } from "../../knex/knex";

describe("API tests", () => {
  beforeAll(() => {
    // Ensure test database is initialized before an tests
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    // Reset contents of the test database
    return knex.seed.run();
  });

  test("GET /api/posts should return all posts", async () => {
    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: posts_endpoint, // NextJS API function to test
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch();
        await expect(res.json()).resolves.toBeInstanceOf(Array);
      },
    });
  });

  test("GET /api/posts?category=[category] should return all posts of category [category]", async () => {
    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: posts_endpoint, // NextJS API function to test
      url: "/api/posts?category=school",
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch();
        await expect(res.json()).resolves.toBeInstanceOf(Array);
      },
    });
  });
  test("GET /api/posts/[id] should return singular posts", async () => {
    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: individualPost_endpoint, // NextJS API function to test
      url: "/api/posts/7",
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch();
        await expect(res.json()).resolves.toBeInstanceOf(Object);
      },
    });
  });
});
