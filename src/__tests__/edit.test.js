import EditProfile from "../pages/profile/[username]/edit";
import { knex } from "../../knex/knex";
import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import fetchMock from "fetch-mock-jest";
import { useSession } from "next-auth/react";
import { act } from "react-dom/test-utils";

const fs = require("fs");
const contents = fs.readFileSync("./data/SeedData.json");
const data = JSON.parse(contents);

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/profile/[username]/edit",
  ])
);

describe("EditProfile", () => {
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
          },
        },
      };
    });
  });

  beforeAll(() => {
    // Ensure test database is initialized before an tests
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });

  beforeAll(() => {
    // Reset the test database before every test
    return knex.seed.run();
  });

  beforeEach(() => {
    fetchMock.get("/api/users/test1", data.UserSeedData[0]);
  });

  test("sanity check", async () => {
    mockRouter.push("/profile/John/edit");

    expect(mockRouter).toMatchObject({
      pathname: "/profile/[username]/edit",
      query: { username: "John" },
    });
  });

  test("Going to user1 edit page will render", async () => {
    mockRouter.setCurrentUrl(`/profile/test1/edit`);

    await act(async () => render(<EditProfile />));
  });
});
