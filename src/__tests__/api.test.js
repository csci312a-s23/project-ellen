import { testApiHandler } from "next-test-api-route-handler";
import posts_endpoint from "../pages/api/posts/index.js";
import comments_endpoint from "../pages/api/comments/index.js";
import individualPost_endpoint from "../pages/api/posts/[id].js";
import individualComment_endpoint from "../pages/api/comments/[id].js";
import { knex } from "../../knex/knex";

describe("API Post tests", () => {
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

describe("API Comment tests", () => {
  beforeAll(() => {
    // Ensure test database is initialized before an tests
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    // Reset contents of the test database
    return knex.seed.run();
  });

  test("GET /api/comments should return all comments", async () => {
    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: comments_endpoint, // NextJS API function to test
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch();
        await expect(res.json()).resolves.toBeInstanceOf(Array);
      },
    });
  });
  test("GET /api/comments/[id] should return a specific comment", async () => {
    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: individualComment_endpoint, // NextJS API function to test
      url: "/api/comments/1",
      paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
      test: async ({ fetch }) => {
        // Test indiv
        const res = await fetch();
        const response = await res.json();
        expect(response.content).toBe("content_1");
      },
    });
  });

  test("POST new to /api/comments", async () => {
    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors

      // post the new comment
      handler: comments_endpoint, // NextJS API function to test
      url: "/api/comments",
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch({
          method: "POST",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify({
            id: 3,
            commenterID: "2",
            postID: 2,
            content: "new comment content",
            likes: 0,
            created_at: new Date(),
          }),
        });
        const response = await res.json();
        expect(typeof response.id).toBe("number");
      },
    });
  });
});
