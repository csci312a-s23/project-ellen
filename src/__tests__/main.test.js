import Home from "@/pages/index";
import PostCreator from "@/components/newPost/PostCreator";
import App from "../pages/_app.js";
import ShowPost from "../pages/posts/[id].js";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import fetchMock from "fetch-mock-jest";
import { knex } from "../../knex/knex";

const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

jest.mock("next/router", () => require("next-router-mock"));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/posts/[id]",
    "/",
  ])
);

const simulatedPostData = data.PostSeedData.map((post, i) => {
  return { ...post, id: i };
});

describe("General Tests", () => {
  beforeAll(() => {
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });
  beforeAll(() => {
    return knex.seed.run();
  });

  afterEach(() => {
    fetchMock.reset();
  });

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

  describe("/posts/[id] shows the post with id = [id]", () => {
    beforeEach(() => {
      // CANNOT be "/0", for some reason that registers as just "/"
      fetchMock.get("begin:/api/posts/1", () => {
        return simulatedPostData[0];
      });
      mockRouter.setCurrentUrl("/");
    });
    afterEach(() => {
      fetchMock.reset();
    });

    test("Render index.js component", async () => {
      mockRouter.setCurrentUrl(`/posts/1`);
      render(<App Component={ShowPost} />);

      expect(
        await screen.findByText(simulatedPostData[0].title)
      ).toBeInTheDocument();
    });
  });
});
