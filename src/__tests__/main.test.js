import Home from "@/pages/index";
import PostCreator from "@/components/post/PostCreator";
import Profile from "@/pages/profile/[username]";
import Post from "@/components/post/post.js";
// import PostPage from "@/components/post/IndividualPost.js";
// import App from "../pages/_app.js";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import fetchMock from "fetch-mock-jest";
import { knex } from "../../knex/knex";
import ShowPost from "../pages/posts/[id].js";
import { act } from "react-dom/test-utils";
import { useSession } from "next-auth/react";
// import { SessionProvider } from "next-auth/react";
import { waitFor } from "@testing-library/react";
import { within } from "@testing-library/dom";
const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

jest.mock("next/router", () => require("next-router-mock"));
// https://github.com/nextauthjs/next-auth/discussions/4185 for help on mocking useSession
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("next-auth/react");

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/profile/[username]",
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
    fetchMock.get("/api/posts/1/comments", [data.CommentSeedData[0]]);
    fetchMock.get("/api/posts/1", data.PostSeedData[0]);
    fetchMock.get("/api/posts", data.PostSeedData);
    fetchMock.get("/api/users/test1", data.UserSeedData[0]);
    fetchMock.get("/api/users/test2", data.UserSeedData[1]);
    fetchMock.get(
      "/api/users/test1/posts",
      data.PostSeedData.filter((post) => parseInt(post.posterID) === 1)
    );
    fetchMock.get(
      "/api/users/test1/comments",
      data.CommentSeedData.filter(
        (comment) => parseInt(comment.commenterID) === 1
      )
    );
    fetchMock.get(
      "/api/users/test2/posts",
      data.PostSeedData.filter((post) => parseInt(post.posterID) === 2)
    );
    fetchMock.get(
      "/api/users/test2/comments",
      data.CommentSeedData.filter(
        (comment) => parseInt(comment.commenterID) === 2
      )
    );
    mockRouter.setCurrentUrl("/");
  });

  afterEach(() => {
    fetchMock.reset();
  });
  beforeAll(() => {
    mockRouter.setCurrentUrl("/");
    useSession.mockImplementation(() => {
      return {
        data: {
          user: {
            name: "test1",
            isAdmin: true,
          },
        },
      };
    });
  });

  describe("End-to-end testing", () => {
    test("Render index.js component", async () => {
      await act(async () => render(<Home />));
    });
  });

  describe("Create new Post", () => {
    test("Render index.js component", async () => {
      render(<PostCreator />);
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
      });
      const newPostButton = screen.getByRole("button", { name: "add" });
      fireEvent.click(newPostButton);
      expect(screen.queryByText("Describe your issue:")).toBeInTheDocument();
    });
  });

  describe("Pop up goes away once exit button is hit", () => {
    test("Render index.js component", async () => {
      render(<PostCreator />);
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
      });
      const newPostButton = screen.getByRole("button", { name: "add" });
      fireEvent.click(newPostButton);
      const closeButton = screen.queryByText("×");
      fireEvent.click(closeButton);
      expect(screen.queryByText("Describe your issue")).not.toBeInTheDocument();
    });
  });

  describe("title input is updated when typing in text box", () => {
    test("Render index.js component", async () => {
      render(<PostCreator />);
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
      });
      const newPostButton = screen.getByRole("button", { name: "add" });
      fireEvent.click(newPostButton);
      const titleInput = screen.getByTestId("title-input");
      const test = "new title";
      fireEvent.change(titleInput, { target: { value: test } });
      expect(titleInput.value).toBe(test);
    });
  });

  describe("description input is updated when typing in text box", () => {
    test("Render index.js component", async () => {
      render(<PostCreator />);
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
      });
      const newPostButton = screen.getByRole("button", { name: "add" });
      fireEvent.click(newPostButton);
      const descInput = screen.getByTestId("description-input");
      const test = "new desc";
      fireEvent.change(descInput, { target: { value: test } });
      expect(descInput.value).toBe(test);
    });
  });

  describe("category is updated once selected", () => {
    test("Render index.js component", async () => {
      render(<PostCreator />);
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
      });
      const newPostButton = screen.getByRole("button", { name: "add" });
      fireEvent.click(newPostButton);
      const catInput = screen.getByTestId("cat-input");
      const test = "Academics";
      fireEvent.change(catInput, { target: { value: test } });
      expect(catInput.value).toBe(test);
    });
  });

  describe("anonymous button switches once clicked", () => {
    test("Render index.js component", async () => {
      render(<PostCreator />);
      await waitFor(() => {
        expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
      });
      const newPostButton = screen.getByRole("button", { name: "add" });
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
      mockRouter.setCurrentUrl(`/profile/test1`);
      const expectedPosts = data.PostSeedData.filter(
        (post) => parseInt(post.posterID) === 1
      );

      render(<Profile />);
      expect(await screen.findAllByTestId("post")).toHaveLength(
        expectedPosts.length
      );
    });

    test("all of user's comments are showing", async () => {
      mockRouter.setCurrentUrl(`/profile/test1`);
      const expectedComments = data.CommentSeedData.filter(
        (comment) => parseInt(comment.commenterID) === 1
      );
      render(<Profile />);
      expect(await screen.findAllByTestId("comment")).toHaveLength(
        expectedComments.length
      );
    });

    test("a signed in user can view their own profile", async () => {
      mockRouter.setCurrentUrl(`/profile/test1`);
      render(<Profile />);
      expect(await screen.findAllByTestId("profile")).not.toHaveLength(0);
    });

    test("a signed in user can view another user's profile", async () => {
      mockRouter.setCurrentUrl(`/profile/test2`);
      render(<Profile />);
      expect(await screen.findAllByTestId("profile")).not.toHaveLength(0);
    });

    test("a user who isn't signed in can view another user's profile", async () => {
      useSession.mockImplementation(() => {
        return {
          data: undefined,
        };
      });

      mockRouter.setCurrentUrl(`/profile/test1`);
      render(<Profile />);
      expect(await screen.findAllByTestId("profile")).not.toHaveLength(0);
    });

    test("Edit button renders when user is on their own page", async () => {
      useSession.mockImplementation(() => {
        return {
          data: { user: { name: "test1", isAdmin: 1 } },
          status: "authenticated",
        };
      });

      mockRouter.setCurrentUrl(`/profile/test1`);

      await waitFor(() => render(<Profile />));

      const editButton = screen.queryByText("Edit");
      await waitFor(() => expect(editButton).toBeInTheDocument());
    });

    test("Edit button won't render when user is on different page", async () => {
      useSession.mockImplementation(() => {
        return {
          data: { user: { name: "test1", isAdmin: 1 } },
          status: "authenticated",
        };
      });

      mockRouter.setCurrentUrl(`/profile/test2`);

      await waitFor(() => render(<Profile />));
      const editButton = screen.queryByText("Edit");
      await waitFor(() => expect(editButton).not.toBeInTheDocument());
    });

    test("Edit button routes to new page", async () => {
      mockRouter.setCurrentUrl(`/profile/test1`);

      await waitFor(() => render(<Profile />));
      const editButton = screen.queryByText("Edit");
      await waitFor(() => expect(editButton).toBeInTheDocument());

      fireEvent.click(editButton);

      await waitFor(() =>
        expect(mockRouter.asPath).toEqual(`/profile/test1/edit`)
      );
    });
  });

  describe("view counts", () => {
    test("number of comments is showing", async () => {
      const examplePost = {
        category: "Athletics",
        content: "this is my issue",
        created_at: "2023-05-07T19:25:14.995Z",
        id: 6,
        myVote: 0,
        num_votes: 1,
        posterID: "11111",
        title: "new post 2",
        comments: [{}, {}, {}],
      };
      render(<Post postInfo={examplePost} />);
      // const find = screen.getByTestId("num_votes")
      // const find2 = within(find).getByText("1")
      const { getByText } = within(screen.getByTestId("num_votes"));
      expect(getByText("1")).toBeInTheDocument();

      const getByText2 = within(screen.getByTestId("num_comments")).getByText;
      expect(getByText2("3")).toBeInTheDocument();
    });
  });
  describe("admin features", () => {
    test("admin can see 'delete post' on all posts", async () => {
      // useSession.mockImplementation(() => {
      // 	return {
      // 		data: {
      // 			user: {
      // 				name: "test1",
      // 				username: "test1",
      // 				isAdmin: 1
      // 			},
      // 		},
      // 	}
      // })
      useSession.mockImplementation(() => {
        return {
          data: { user: { name: "test1", isAdmin: 1 } },
          status: "authenticated",
        };
      });
      const examplePost = {
        category: "Academics",
        content:
          "I got 0/4 courses for fall course registration. It is outrageous that as a junior I cannot get classes to fuffil my major!",
        created_at: "2023-05-09T13:04:18.913Z",
        id: 1,
        myVote: 0,
        num_votes: 8,
        poster: null,
        posterID: "3",
        title: "O for Registration",
        voteSum: 0,
      };
      mockRouter.setCurrentUrl(`/posts/1`);
      await waitFor(() => {
        render(
          <ShowPost
            currentPost={examplePost}
            setUnauthorized={jest.fn()}
            setAuthMessage={jest.fn()}
          />
        );
      });
      // screen.getByText()
      expect(screen.getByText("Delete Post")).toBeInTheDocument();
    });
  });
});
