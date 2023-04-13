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
