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
    await act(async () =>
      render(<PostList posts={PostSeedData} sortingFilter="new" />)
    );
  });

  test("When currentFilter is new, should render three posts", async () => {
    await act(async () =>
      render(<PostList posts={PostSeedData} sortingFilter="new" />)
    );
    const post1 = await screen.getByText("title1");
    const post2 = screen.getByText("title2");
    const post3 = screen.getByText("title3");
    expect(post1).not.toBeNull();
    expect(post2).not.toBeNull();
    expect(post3).not.toBeNull();
  });

  test("When currentFilter is hot, should render two posts", async () => {
    await act(async () =>
      render(<PostList posts={PostSeedData} sortingFilter="hot" />)
    );
    const post1 = await screen.getByText("title1");
    const post2 = screen.queryByText("title2");
    const post3 = screen.getByText("title3");
    expect(post1).not.toBeNull();
    expect(post2).toBeNull();
    expect(post3).not.toBeNull();
  });
  test("When posts are null, should not render any posts", () => {
    const post1 = screen.queryByText("title1");
    const post2 = screen.queryByText("title2");
    const post3 = screen.queryByText("title3");
    expect(post1).toBeNull();
    expect(post2).toBeNull();
    expect(post3).toBeNull();
  });

  test("Check to see the posts are correctly sorted by date", async () => {
    await act(async () =>
      render(<PostList posts={PostSeedData} sortingFilter="new" />)
    );

    const items = await screen.findAllByTestId("post");
    const dates = items.map(
      (item) => new Date(item.children[3].innerHTML.slice(12))
    );
    console.log(dates);
    let sorted = true;
    for (let i = 1; i < dates.length; i++) {
      if (dates[i] > dates[i - 1]) {
        sorted = false;
      }
    }
    expect(sorted).toBe(true);
  });
});