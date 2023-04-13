import Home from "@/pages/index";
import { render } from "@testing-library/react";
// import fetchMock from "jest-fetch-mock"
// const originalFetch = global.fetch;
// global.fetch = (url, ...params) => {
//   if (typeof url === "string" && url.startsWith("/")) {
//     return originalFetch(`http://0.0.0.0:3000${url}`, ...params);
//   }
//   return originalFetch(url, ...params);
// };

import mockRouter from "next-router-mock";
import fetchMock from "fetch-mock-jest";

jest.mock("next/router", () => require("next-router-mock"));

describe("End-to-end testing", () => {
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

  test("Render index.js component", () => {
    mockRouter.push("/initial-path");
    render(<Home />);
  });
});
