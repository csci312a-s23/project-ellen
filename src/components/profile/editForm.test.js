//import EditProfile from "../../pages/profile/[username]/edit";
import { knex } from "../../../knex/knex";
import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import fetchMock from "fetch-mock-jest";
import { useSession } from "next-auth/react";
import { act } from "react-dom/test-utils";
import EditForm from "./editForm";

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

describe("EditForm tests", () => {
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

  test("Smoke test", async () => {
    await act(async () => render(<EditForm username={"test1"} />));
  });

  test("Edit button renders properly for correct user", async () => {
    const user = data.UserSeedData[0];

    mockRouter.setCurrentUrl(`/profile/test1`);
    await act(async () => render(<EditForm username={"test1"} />));

    const usernameInput = screen.getByLabelText("Username").value;
    const emailInput = screen.getByLabelText("Email").value;
    const firstNameInput = screen.getByLabelText("First Name").value;
    const lastNameInput = screen.getByLabelText("Last Name").value;
    const classInput = screen.getByLabelText("Class Year").value;
    const majorInput = screen.getByLabelText("Major").value;

    const classInt = parseInt(classInput);

    expect(usernameInput).toEqual(user.username);
    expect(emailInput).toEqual(user.email);
    expect(firstNameInput).toEqual(user.firstName);
    expect(lastNameInput).toEqual(user.lastName);
    expect(classInt).toEqual(user.classYear);
    expect(majorInput).toEqual(user.major);
  });

  test("Edit form will conditionally render if student", async () => {
    mockRouter.setCurrentUrl(`/profile/test1`);
    await act(async () => render(<EditForm username={"test1"} />));

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Class Year")).toBeInTheDocument();
    expect(screen.getByLabelText("Major")).toBeInTheDocument();
    expect(screen.queryByText("Title")).toBeNull();
    expect(screen.queryByText("Department")).toBeNull();
  });

  test("Edit form will conditionally render if faculty", async () => {
    fetchMock.get("/api/users/test4", data.UserSeedData[3]);

    mockRouter.setCurrentUrl(`/profile/test4`);
    await act(async () => render(<EditForm username={"test4"} />));

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Department")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.queryByText("Major")).toBeNull();
    expect(screen.queryByText("Class Year")).toBeNull();
  });

  test("Changing all relevant text fields works", async () => {
    await act(async () => render(<EditForm username={"test1"} />));

    const usernameInput = screen.getByLabelText("Username");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const classInput = screen.getByLabelText("Class Year");
    const majorInput = screen.getByLabelText("Major");

    act(() => {
      fireEvent.change(usernameInput, { target: { value: "newUsername" } });
      fireEvent.change(firstNameInput, { target: { value: "newFirst" } });
      fireEvent.change(lastNameInput, { target: { value: "newLast" } });
      fireEvent.change(classInput, { target: { value: "2026" } });
      fireEvent.change(majorInput, { target: { value: "Comp Sci" } });
    });

    expect(usernameInput).toHaveValue("newUsername");
    expect(firstNameInput).toHaveValue("newFirst");
    expect(lastNameInput).toHaveValue("newLast");
    expect(classInput).toHaveValue("2026");
    expect(majorInput).toHaveValue("Comp Sci");
  });

  test("Email text box should be disabled for editing", async () => {
    await act(async () => render(<EditForm username={"test1"} />));
    const emailInput = screen.getByLabelText("Email");
    const previousValue = emailInput.value;

    act(() => {
      fireEvent.change(emailInput, { target: { value: "new@middlebury.edu" } });
    });

    expect(emailInput.value).toBe(previousValue);
  });

  test("Cancel button routes back to profile page", async () => {
    mockRouter.setCurrentUrl(`/profile/test1`);
    await act(async () => render(<EditForm username={"test1"} />));

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);

    expect(mockRouter.asPath).toEqual(`/profile/test1`);
  });

  test("Submit functionality works", async () => {
    mockRouter.setCurrentUrl(`/profile/test1`);
    await act(async () => render(<EditForm username={"test1"} />));

    expect(screen.getByLabelText("Major")).toBeInTheDocument();

    // Update some fields
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "New Name" },
    });

    fireEvent.change(screen.getByLabelText("Major"), {
      target: { value: "New Major" },
    });

    const fetchPut = jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Assert that the API request was made with the correct body
    expect(fetchPut).toHaveBeenCalledWith(`/api/users/test1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classYear: 2024,
        department: "",
        email: "test1@test.com",
        firstName: "New Name",
        lastName: "test1",
        major: "New Major",
        title: "",
        username: "test1",
      }),
    });

    fetchPut.mockRestore();
  });
});
