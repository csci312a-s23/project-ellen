/**
 * @jest-environment node
 *
 * Use Node environment for server-side tests to avoid loading browser libraries
 */

import { testApiHandler } from "next-test-api-route-handler";
import posts_endpoint from "../pages/api/posts/index.js";
import individualPost_endpoint from "../pages/api/posts/[id]/index.js";
import postComments_endpoint from "../pages/api/posts/[id]/comments.js";
import newPost_endpoint from "../pages/api/posts/index.js";
import vote_endpoint from "../pages/api/posts/[id]/vote.js";
import analytics_post_endpoint from "../pages/api/analytics/posts.js";
import analytics_comm_endpoint from "../pages/api/analytics/comments.js";
import analytics_votes_endpoint from "../pages/api/analytics/comments.js";
// import newUser_endpoint from "../pages/api/user/new.js";
import users_endpoint from "../pages/api/users/index.js";
import individualUser_endpoint from "../pages/api/users/[username]/index.js";
import userPosts_endpoint from "../pages/api/users/[username]/posts.js";
import userComments_endpoint from "../pages/api/users/[username]/comments.js";
import makeCommentVote_endpoint from "../pages/api/posts/[id]/comments.js";

import { knex } from "../../knex/knex";
import { getServerSession } from "next-auth/next";
jest.mock("next-auth/next");
jest.mock("directory.js", () => {
  return {
    Scraper: jest.fn().mockImplementation(() => {
      return {
        init: jest.fn().mockResolvedValue(),
        person: {
          id: 1,
          firstName: "Test",
          lastName: "User",
          type: "Student",
          gradYear: 2021,
          department: "Computer Science",
        },
      };
    }),
  };
});

jest.mock("departments.js", () => {
  return {
    Scraper: jest.fn().mockImplementation(() => {
      return {
        init: jest.fn().mockResolvedValue(),
        departments: [
          {
            name: "Computer Science",
          },
          {
            name: "Mathematics",
          },
        ],
      };
    }),
  };
});

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
  afterAll(() => {
    // Ensure database connection is cleaned up after all tests
    return knex.destroy();
  });

  beforeEach(() => {
    // Mock nex-auth getServerSession with id of test user
    getServerSession.mockResolvedValue({
      user: {
        id: "1",
        googleID: "3253415415415458",
        username: "test1",
        email: "test1@middlebury.edu",
        firstName: "test1",
        lastName: "test1",
        type: "Student",
        classYear: 2024,
        major: "Computer Science",
      },
    });
    return knex.seed.run();
  });

  afterEach(() => {
    getServerSession.mockReset();
  });

  describe("Posts API tests", () => {
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
        userID: 2,
        value: 2,
      };

      // const post = data.PostSeedData[0];

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
          expect(response.newVoteSum).toBe(2);
        },
      });
    });

    test("DELETE /api/posts/[id] should delete post and associated votes and comments", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: individualPost_endpoint, // NextJS API function to test
        url: "/api/posts/1",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch({
            method: "DELETE",
          });

          const response = await res.json();
          expect(response.message).toBe("Post deleted");
          //check the post is deleted from the database
          await expect(
            knex("posts").where({ id: 1 }).select("*")
          ).resolves.toHaveLength(0);
          //check the comments are deleted from the database
          await expect(
            knex("comments").where({ postID: 1 }).select("*")
          ).resolves.toHaveLength(0);
          //check the votes are deleted from the database
          await expect(
            knex("votes").where({ postID: 1 }).select("*")
          ).resolves.toHaveLength(0);
        },
      });
    });
  });

  describe("User API tests", () => {
    beforeAll(() => {
      // Ensure test database is initialized before an tests
      return knex.migrate.rollback().then(() => knex.migrate.latest());
    });

    beforeAll(() => {
      // Reset contents of the test database
      return knex.seed.run();
    });
    test("GET /api/users should return all users", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: users_endpoint, // NextJS API function to test
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch();
          await expect(res.json()).resolves.toBeInstanceOf(Array);
        },
      });
    });

    test("GET /api/users/[username] should return singular user", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: individualUser_endpoint, // NextJS API function to test
        url: "/api/users/test1",
        paramsPatcher: (params) => (params.username = "test1"), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          // Test indiv
          const res = await fetch();
          const response = await res.json();
          expect(response.username).toBe(data.UserSeedData[0].username);
        },
      });
    });

    test("PUT /api/userss/[username] should return updated user", async () => {
      const updatedUser = {
        username: "updated user",
        email: "updated@newemail.com",
        classYear: 2023,
      };

      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: individualUser_endpoint, // NextJS API function to test
        url: "/api/users/test1",
        paramsPatcher: (params) => (params.username = "test1"), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch({
            method: "PUT",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify(updatedUser),
          });

          const response = await res.json();
          expect(response.username).toBe(updatedUser.username);
        },
      });
    });

    test("GET /api/users/[username]/posts should return all posts by user", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: userPosts_endpoint, // NextJS API function to test
        url: "/api/users/test1/posts",
        paramsPatcher: (params) => (params.username = "test1"), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch();
          const response = await res.json();
          expect(response[0].posterID).toBe("1");
        },
      });
    });

    test("GET /api/users/[username]/comments should return all comments by user", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: userComments_endpoint, // NextJS API function to test
        url: "/api/users/test1/comments",
        paramsPatcher: (params) => (params.username = "test1"), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch();
          const response = await res.json();
          expect(response[0].commenterID).toBe("1");
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

    test("GET /api/post/[id]/comments should return all comments for a post", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: postComments_endpoint, // NextJS API function to test
        url: "/api/posts/1/comments",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher - ?
        test: async ({ fetch }) => {
          // test endpoint
          const res = await fetch();
          const response = await res.json();
          expect(response.content).toBe(
            data.CommentSeedData.filter((c) => {
              c.postID === 1;
            }).content
          );
        },
      });
    });
    test("DELETE /api/posts/[id]/comments should delete comment", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: postComments_endpoint, // NextJS API function to test
        url: "/api/posts/1/comments",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch({
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              commentID: 1,
            }),
          });
          // console.log(res);
          const response = await res.json();
          expect(response.message).toBe("Comment deleted");
        },
      });
    });

    test("POST new to /api/posts/[id]/comments", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors

        // post the new comment
        handler: postComments_endpoint, // NextJS API function to test
        url: "/api/posts/1/comments",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher - ?
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              content: "new comment content",
            }),
          });

          const response = await res.json();

          expect(response).toHaveProperty("commenterID", "1"); //we expect a one here because the user id based on the session is 1
          expect(response).toHaveProperty("postID", 1);
          expect(response).toHaveProperty("content", "new comment content");
          expect(response).toHaveProperty("created_at");
          expect(response).toHaveProperty("id");
          expect(response).toHaveProperty("likes");
        },
      });
    });
  });

  describe("Unauthenticated API calls are rejected", () => {
    beforeEach(() => {
      getServerSession.mockResolvedValue(undefined);
    });

    test("POST /api/posts/ should be rejected", async () => {
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

          expect(res.ok).toBe(false);
          expect(res.status).toBe(403);
        },
      });
    });

    test("POST /api/posts/[id]/comments should be rejected", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors

        // post the new comment
        handler: postComments_endpoint, // NextJS API function to test
        url: "/api/posts/1/comments",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher - ?
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              content: "new comment content",
            }),
          });

          expect(res.ok).toBe(false);
          expect(res.status).toBe(403);
        },
      });
    });

    test("PATCH /api/posts/[id] should be rejected", async () => {
      const downvote = {
        vote: "downvote",
        userID: "1",
      };

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

          expect(res.ok).toBe(false);
          expect(res.status).toBe(403);
        },
      });
    });

    test("PUT /api/users/[id] should be rejected", async () => {
      const updatedUser = {
        username: "updated user",
        email: "updated@newemail.com",
        id: 1,
      };

      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: individualUser_endpoint, // NextJS API function to test
        url: "/api/user/1",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          const res = await fetch({
            method: "PUT",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify(updatedUser),
          });

          expect(res.ok).toBe(false);
          expect(res.status).toBe(403);
        },
      });
    });
  });

  describe("Voting tests", () => {
    beforeEach(() => {
      // Ensure test database is initialized before an tests
      return knex.migrate.rollback().then(() => knex.migrate.latest());
    });

    beforeEach(() => {
      // Reset contents of the test database
      return knex.seed.run();
    });

    test("initial vote increments total votes", async () => {
      const initial = await knex("votes").where({
        postID: "1",
        typeOf: "post",
      });
      expect(initial.length).toBe(0);
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: vote_endpoint, // NextJS API function to test
        url: "/api/posts/1/vote",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
        requestPatcher: (req) => (req.user = { id: 1 }),
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          await fetch({
            method: "PATCH",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              value: 5,
            }),
          });

          const final = await knex("votes").where({
            postID: "1",
            typeOf: "post",
          });

          expect(final.length).toBe(1);
        },
      });
    });

    test("duplicate vote increments does not increase total votes", async () => {
      const initial = await knex("votes").where({
        postID: "1",
        typeOf: "post",
      });
      expect(initial.length).toBe(0);

      // vote 1
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: vote_endpoint, // NextJS API function to test
        url: "/api/posts/1/vote",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
        requestPatcher: (req) => (req.user = { id: 1 }),
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          await fetch({
            method: "PATCH",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              value: 5,
            }),
          });

          const final = await knex("votes").where({
            postID: "1",
            typeOf: "post",
          });
          expect(final.length).toBe(1);
        },
      });

      // vote 2
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: vote_endpoint, // NextJS API function to test
        url: "/api/posts/1/vote",
        paramsPatcher: (params) => (params.id = 1), // Testing dynamic routes requires patcher
        requestPatcher: (req) => (req.user = { id: 1 }),
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          await fetch({
            method: "PATCH",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              value: 5,
            }),
          });

          const final = await knex("votes").where({
            postID: "1",
            typeOf: "post",
          });
          expect(final.length).toBe(1);
        },
      });
    });
  });

  describe("comment voting tests:", () => {
    beforeEach(() => {
      // Ensure test database is initialized before an tests
      return knex.migrate.rollback().then(() => knex.migrate.latest());
    });

    beforeEach(() => {
      // Reset contents of the test database
      return knex.seed.run();
    });

    test("new vote increments", async () => {
      const initialComment = await knex("comments")
        .where({ postID: "1", id: "1" })
        .first();

      expect(initialComment.likes).toEqual(2);

      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: makeCommentVote_endpoint, // NextJS API function to test
        url: "/api/posts/1/comments",
        test: async ({ fetch }) => {
          // Test endpoint with mock fetch
          await fetch({
            method: "PATCH",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              vote: "upvote",
              postID: 1,
              commentID: 1,
            }),
          });

          const finalComment = await knex("comments")
            .where({ postID: "1", id: "1" })
            .first();
          expect(finalComment.likes).toEqual(3);
        },
      });
    });

    test("new vote overrides old vote", async () => {
      const initialComment = await knex("comments")
        .where({ postID: "1", id: "1" })
        .first();

      expect(initialComment.likes).toEqual(2);

      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: makeCommentVote_endpoint, // NextJS API function to test
        url: "/api/posts/1/comments",
        test: async ({ fetch }) => {
          await fetch({
            method: "PATCH",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              vote: "upvote",
              postID: 1,
              commentID: 1,
            }),
          });

          // console.log("initresponse", res)
          const intermediateComment = await knex("comments")
            .where({ postID: "1", id: "1" })
            .first();
          expect(intermediateComment.likes).toEqual(3);
        },
      });

      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: makeCommentVote_endpoint, // NextJS API function to test
        url: "/api/posts/1/comments",
        test: async ({ fetch }) => {
          await fetch({
            method: "PATCH",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify({
              vote: "downvote",
              postID: 1,
              commentID: 1,
            }),
          });

          const finalComment = await knex("comments")
            .where({ postID: "1", id: "1" })
            .first();
          expect(finalComment.likes).toEqual(1);
        },
      });
    });
  });

  describe("Analytics API endpoints", () => {
    beforeAll(() => {
      // Ensure test database is initialized before an tests
      return knex.migrate.rollback().then(() => knex.migrate.latest());
    });

    beforeEach(() => {
      // Reset contents of the test database
      return knex.seed.run();
    });

    test("GET /api/analytics/posts should return all posts linked with related users", async () => {
      await testApiHandler({
        rejectOnHandlerError: true,
        handler: analytics_post_endpoint,
        url: "/api/analytics/posts",
        test: async ({ fetch }) => {
          const res = await fetch();
          const response = await res.json();
          expect(response).toHaveLength(data["PostSeedData"].length);
          expect(response[0]).toEqual(
            expect.objectContaining({
              id: 1,
              poster: expect.objectContaining({
                id: "1",
                username: "test1",
              }),
            })
          );
        },
      });
    });
    test("GET /api/analytics/comments should return all comments linked with related posts and users", async () => {
      await testApiHandler({
        rejectOnHandlerError: true, // Make sure to catch any errors
        handler: analytics_comm_endpoint,
        url: "/api/analytics/comments",
        test: async ({ fetch }) => {
          const res = await fetch();
          const response = await res.json();
          expect(response).toHaveLength(data["CommentSeedData"].length);
          /*expect(response[0]).toEqual(expect.objectContaining(
            {
              id: 1,
              poster: expect.objectContaining({
                id: "1",
                username: "test1",
              }),
              post: expect.objectContaining(
                {
                  id: 1,
                  poster: expect.objectContaining({
                    id: "1",
                    username: "test1",
                  })
                }
              )
            }
        ));*/
        },
      });
    });
    test.skip("GET /api/analytics/votes should return all votes linked with related posts and users", async () => {
      await testApiHandler({
        rejectOnHandlerError: true,
        handler: analytics_votes_endpoint,
        url: "/api/analytics/votes",
        test: async ({ fetch }) => {
          const res = await fetch();
          console.log(res);
          const response = await res.json();
          expect(response).toHaveLength(data["VoteSeedData"].length);
          /*expect(response[0]).toEqual(expect.objectContaining(
            {
              id: 1,
              poster: expect.objectContaining({
                id: "1",
                username: "test1",
              })
            }
        ));*/
        },
      });
    });
  });
});
