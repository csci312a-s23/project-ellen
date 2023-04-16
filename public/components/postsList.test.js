import { render, screen } from "@testing-library/react";
import PostList from "./postsList";
import fetchMock from "fetch-mock-jest";
import { PostSeedData } from "../../data/SeedData.json";
import { act } from "react-dom/test-utils";

describe("postList: postList tests", () => {
  beforeEach(() => {
    fetchMock.get("/api/posts", PostSeedData);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  test("Smoke test", async () => {
    await act(async () => render(<PostList sortingFilter="new" />));
  });

  test("When currentFilter is new, should render three posts", async () => {
    await act(async () => render(<PostList sortingFilter="new" />));
    const post1 = await screen.findByText("title1");
    const post2 = await screen.findByText("title2");
    const post3 = await screen.findByText("title3");
    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
    expect(post3).toBeInTheDocument();
  });

  test("When currentFilter is hot, should render one post", async () => {
    await act(async () => render(<PostList sortingFilter="hot" />));
    const post1 = await screen.findByText("title1");
    const post2 = screen.queryByText("title2");
    const post3 = screen.queryByText("title3");
    expect(post1).toBeInTheDocument();
    expect(post2).toBeNull();
    expect(post3).toBeNull();
  });

  //Currently not working due to some odd date formatting

  //more tests?
});
