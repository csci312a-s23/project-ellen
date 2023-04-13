import Home from "@/pages/index";
import PostCreator from "@/components/newPost/PostCreator";
import { render, screen, fireEvent } from "@testing-library/react";
// import fetchMock from "jest-fetch-mock"

// const originalFetch = global.fetch;
// global.fetch = (url, ...params) => {
//   if (typeof url === "string" && url.startsWith("/")) {
//     return originalFetch(`http://0.0.0.0:3000${url}`, ...params);
//   }
//   return originalFetch(url, ...params);
// };

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
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
