import { testApiHandler } from "next-test-api-route-handler";
import posts_endpoint from "../pages/api/posts/index.js";
import individualPost_endpoint from "../pages/api/posts/[id].js";
import newPost_endpoint from "../pages/api/posts/new/index.js";
import { knex } from "../../knex/knex";

const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

describe("API tests", () => {
  beforeAll(() => {
    // Ensure test database is initialized before an tests
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });

  beforeAll(() => {
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
      url: `/api/posts?category=${data.PostSeedData[0].category}`,
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch();
        const response = await res.json();
        expect(response[0].category).toBe(data.PostSeedData[0].category);
      },
    });
  });

  test("GET /api/posts/[id] should return singular post", async () => {
    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: individualPost_endpoint, // NextJS API function to test
      url: "/api/posts/1",
      paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
      test: async ({ fetch }) => {
        // Test indiv
        const res = await fetch();
        const response = await res.json();
        expect(response.content).toBe(data.PostSeedData[0].content);
      },
    });
  });

  test("POST /api/posts/new should return create a new post", async () => {
    const newPost = {
      posterID: "1111",
      title: "new title",
      content: "new content",
      category: "school",
      created_at: new Date().toISOString(),
    };

    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: newPost_endpoint, // NextJS API function to test
      url: "/api/posts/new",
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(newPost),
        });

        const response = await res.json();
        expect(typeof response.id).toBe("number");
      },
    });
  });
});
