import { render } from "@testing-library/react";
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
          created_at: "2023-04-01T18:25:43.511Z",
        },
        {
          title: "title2",
          posterID: 2,
          content: "content2",
          category: "food",
          votes: 0,
          created_at: "2023-03-09T18:25:43.511Z",
        },
        {
          title: "title3",
          posterID: 2,
          content: "content3",
          category: "food",
          votes: 20,
          created_at: "2023-04-12T18:25:43.511Z",
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

  //NEED MORE TESTS
});
