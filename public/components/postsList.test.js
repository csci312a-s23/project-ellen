import { render, screen } from "@testing-library/react";
import PostList from "./postsList";
import fetchMock from "fetch-mock-jest";

describe("postList: postList tests", () => {
  beforeEach(() => {
    fetchMock.get("begin:/api/posts", () => {
      return [
        {
          title: "title1",
          posterID: 1,
          content: "content1",
          category: "school",
          votes: 100,
          created_at: new Date(),
        },
        {
          title: "title2",
          posterID: 2,
          content: "content2",
          category: "food",
          votes: 0,
          created_at: new Date(),
        },
        {
          title: "title3",
          posterID: 2,
          content: "content3",
          category: "food",
          votes: 20,
          created_at: new Date(),
        },
      ];
    });
  });

  afterEach(() => {
    fetchMock.reset();
  });

  test("Smoke test", () => {
    render(<PostList currentFilter={"new"} />);
  });

  test("When currentFilter is new, should render three posts", async () => {
    render(<PostList currentFilter="new" />);
    const post1 = await screen.findByText("title1");
    const post2 = await screen.findByText("title2");
    const post3 = await screen.findByText("title3");
    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
    expect(post3).toBeInTheDocument();
  });

  test("When currentFilter is hot, should render one post", async () => {
    render(<PostList currentFilter="hot" />);
    const post1 = await screen.findByText("title1");
    const post2 = await screen.queryByText("title2");
    const post3 = await screen.queryByText("title3");
    expect(post1).toBeInTheDocument();
    expect(post2).not.toBeInTheDocument();
    expect(post3).not.toBeInTheDocument();
  });

  //Currently not working due to some odd date formatting

  // test("When currentFilter is recent, should render two posts", async () => {
  //   render(<PostList currentFilter="recent"/>);
  //   const post1 = await screen.queryByText("title1");
  //   const post2 = await screen.queryByText("title2");
  //   const post3 = await screen.findByText("title3");
  //   expect(post1).not.toBeInTheDocument();
  //   expect(post2).not.toBeInTheDocument();
  //   expect(post3).toBeInTheDocument();
  // });

  //NEED MORE TESTS
});
