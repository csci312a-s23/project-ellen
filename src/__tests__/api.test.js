import { testApiHandler } from "next-test-api-route-handler";
import posts_endpoint from "../pages/api/posts/index.js";
import comments_endpoint from "../pages/api/comments/index.js";
import individualPost_endpoint from "../pages/api/posts/[id]/index.js";
import individualComment_endpoint from "../pages/api/comments/[id].js";
import newPost_endpoint from "../pages/api/posts/index.js";
import vote_endpoint from "../pages/api/posts/[id]/vote.js";
import { knex } from "../../knex/knex";

const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

describe("API Post tests", () => {
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

  test("POST /api/posts should return create a new post", async () => {
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
      url: "/api/posts",
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

  test("PATCH /api/posts/[id]/vote should return upvoted post on upvote", async () => {
    const upvote = {
      vote: "upvote",
      userID: "2",
    };

    const post = data.PostSeedData[0];

    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: vote_endpoint, // NextJS API function to test
      url: "/api/posts/1/vote",
      paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch({
          method: "PATCH",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(upvote),
        });

        const response = await res.json();
        expect(response.votes).toBe(post.votes + 1);
      },
    });
  });

  test("PATCH /api/posts/[id]/vote should return downvoted post on downvote", async () => {
    const downvote = {
      vote: "downvote",
      userID: "1",
    };
    const post = data.PostSeedData[1];

    await testApiHandler({
      rejectOnHandlerError: true, // Make sure to catch any errors
      handler: vote_endpoint, // NextJS API function to test
      url: "/api/posts/2/vote",
      paramsPatcher: (params) => (params.id = 2), // Testing dynamic routes requires patcher
      test: async ({ fetch }) => {
        // Test endpoint with mock fetch
        const res = await fetch({
          method: "PATCH",
          headers: {
            "content-type": "application/json", // Must use correct content type
          },
          body: JSON.stringify(downvote),
        });

        const response = await res.json();
        expect(response.votes).toBe(post.votes - 1);
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
        expect(response.content).toBe("content1");
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
        expect(response.content).toBe("content1");
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
