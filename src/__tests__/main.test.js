import Home from "@/pages/index";
import PostCreator from "@/components/post/PostCreator";
import Profile from "@/pages/profile/[id]";
// import App from "../pages/_app.js";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import fetchMock from "fetch-mock-jest";
import { knex } from "../../knex/knex";
import ShowPost from "../pages/posts/[id].js";
import { act } from "react-dom/test-utils";
// import { SessionProvider } from "next-auth/react";

const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "Testing" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/profile/[id]",
    "/posts/[id]",
    "/posts",
    "/",
  ])
);

describe("General Tests", () => {
  beforeAll(() => {
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });
  beforeAll(() => {
    return knex.seed.run();
  });

  beforeEach(() => {
    // getServerSession.mockResolvedValue({
    //   user: {
    //     email: "test@middlebury.edu",
    //     id: "1",
    //     image: "",
    //     name: "Jest Test",
    //   },
    // });

    fetchMock.get("/api/posts/1/comments", [data.CommentSeedData[0]]);
    fetchMock.get("/api/posts/1", data.PostSeedData[0]);
    fetchMock.get("/api/posts", data.PostSeedData);
    fetchMock.get("/api/user/1", data.UserSeedData[0]);
    fetchMock.get(
      "/api/user/1/posts",
      data.PostSeedData.filter((post) => parseInt(post.posterID) === 1)
    );
    fetchMock.get(
      "/api/user/1/comments",
      data.CommentSeedData.filter(
        (comment) => parseInt(comment.commenterID) === 1
      )
    );
    mockRouter.setCurrentUrl("/");
  });

  afterEach(() => {
    fetchMock.reset();
  });
  beforeAll(() => {
    mockRouter.setCurrentUrl("/");
  });

  describe("End-to-end testing", () => {
    test("Render index.js component", async () => {
      await act(async () => render(<Home />));
    });
  });

  describe("Create new Post", () => {
    test("Render index.js component", () => {
      render(<PostCreator />);
      expect(screen.queryByText("New Post")).toBeInTheDocument();
      const newPostButton = screen.queryByText("New Post");
      fireEvent.click(newPostButton);
      expect(screen.queryByText("Describe your issue:")).toBeInTheDocument();
    });
  });

  describe("Pop up goes away once exit button is hit", () => {
    test("Render index.js component", () => {
      render(<PostCreator />);
      expect(screen.queryByText("New Post")).toBeInTheDocument();
      const newPostButton = screen.queryByText("New Post");
      fireEvent.click(newPostButton);
      const closeButton = screen.queryByText("×");
      fireEvent.click(closeButton);
      expect(screen.queryByText("Describe your issue")).not.toBeInTheDocument();
    });
  });

  describe("title input is updated when typing in text box", () => {
    test("Render index.js component", () => {
      render(<PostCreator />);
      expect(screen.queryByText("New Post")).toBeInTheDocument();
      const newPostButton = screen.queryByText("New Post");
      fireEvent.click(newPostButton);
      const titleInput = screen.getByTestId("title-input");
      const test = "new title";
      fireEvent.change(titleInput, { target: { value: test } });
      expect(titleInput.value).toBe(test);
    });
  });

  describe("description input is updated when typing in text box", () => {
    test("Render index.js component", () => {
      render(<PostCreator />);
      expect(screen.queryByText("New Post")).toBeInTheDocument();
      const newPostButton = screen.queryByText("New Post");
      fireEvent.click(newPostButton);
      const descInput = screen.getByTestId("description-input");
      const test = "new desc";
      fireEvent.change(descInput, { target: { value: test } });
      expect(descInput.value).toBe(test);
    });
  });

  describe("category is updated once selected", () => {
    test("Render index.js component", () => {
      render(<PostCreator />);
      expect(screen.queryByText("New Post")).toBeInTheDocument();
      const newPostButton = screen.queryByText("New Post");
      fireEvent.click(newPostButton);
      const catInput = screen.getByTestId("cat-input");
      const test = "Food";
      fireEvent.change(catInput, { target: { value: test } });
      expect(catInput.value).toBe(test);
    });
  });

  describe("anonymous button switches once clicked", () => {
    test("Render index.js component", () => {
      render(<PostCreator />);
      expect(screen.queryByText("New Post")).toBeInTheDocument();
      const newPostButton = screen.queryByText("New Post");
      fireEvent.click(newPostButton);
      const anonInput = screen.getByTestId("anon-input");
      const firstState = anonInput.checked;
      fireEvent.click(anonInput);
      const secState = anonInput.checked;
      expect(secState).toBe(!firstState);
    });
  });

  describe("/posts/[id] shows the post with id = [id]", () => {
    test("Render index.js component", async () => {
      mockRouter.setCurrentUrl(`/posts/1`);
      render(<ShowPost currentPost={data.PostSeedData[0]} />);

      expect(
        await screen.findByText(data.PostSeedData[0].title)
      ).toBeInTheDocument();
    });
  });

  describe("comments testing", () => {
    test("comments are showing", async () => {
      render(<ShowPost currentPost={data.PostSeedData[0]} />);
      expect(
        await screen.findByText(data.CommentSeedData[0].content)
      ).toBeInTheDocument();
    });
  });

  describe("Profile Page testing", () => {
    // not planning on testing that posts are sorted because thats handled in
    // post list tests

    test("all of user's posts are showing", async () => {
      mockRouter.setCurrentUrl(`/profile/1`);
      const expectedPosts = data.PostSeedData.filter(
        (post) => parseInt(post.posterID) === 1
      );
      render(<Profile />);
      expect(await screen.findAllByTestId("post")).toHaveLength(
        expectedPosts.length
      );
    });

    test("all of user's comments are showing", async () => {
      mockRouter.setCurrentUrl(`/profile/1`);
      const expectedComments = data.CommentSeedData.filter(
        (comment) => parseInt(comment.commenterID) === 1
      );
      render(<Profile />);
      expect(await screen.findAllByTestId("comment")).toHaveLength(
        expectedComments.length
      );
    });
  });
});
