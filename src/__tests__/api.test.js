import { testApiHandler } from "next-test-api-route-handler";
import posts_endpoint from "../pages/api/posts/index.js";
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
        // TODO define
        await expect(res.json()).resolves.toBeInstanceOf(Array);
      },
    });
  });
});
