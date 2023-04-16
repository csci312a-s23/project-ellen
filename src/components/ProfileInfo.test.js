import ProfileInfo from "./ProfileInfo";
import { knex } from "../../knex/knex";
import { screen, render } from "@testing-library/react";
import seedData from "../../data/SeedData.json";

const sampleUserData = { ...seedData.UserSeedData };
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values
const sampleUsers = Object.values(sampleUserData);

// test used for students, faculty, and admin to make sure
// correct things are displayed on the profile page
const displayTest = (userData, expectedItems, items) => {
  expect(items).toHaveLength(expectedItems.length);

  Object.entries(userData).forEach(([key, val]) => {
    if (expectedItems.includes(key)) {
      // using getAllByText because first name can equal last name
      // getting first element of returned array because they'll be the same element anyways
      expect(screen.getAllByText(val)[0]).toBeVisible();
    }
    // we don't want to see elements like id
    else {
      expect(screen.queryByText(val)).toBeFalsy();
    }
  });
};

describe("ProfileInfo tests", () => {
  beforeAll(() => {
    // Ensure test database is initialized before an tests
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    // Reset the test database before every test
    return knex.seed.run();
  });

  describe("ProfileInfo: Basic Functionality Tests", () => {
    beforeEach(() => {
      render(<ProfileInfo user={sampleUsers[0]} />);
    });

    test("ProfileInfo: User Data isn't mutated", () => {
      const originalData = [sampleUsers[0]];
      const inputData = [...originalData];
      render(<ProfileInfo user={inputData} />);

      expect(inputData).toEqual(originalData);
    });
  });

  describe("ProfileInfo: Student Tests", () => {
    beforeEach(() => {
      render(<ProfileInfo user={sampleUsers[0]} />);
    });

    test("ProfileInfo: Displays correct Student info", async () => {
      //the things we want displayed
      const items = await screen.findAllByTestId("profile");
      const expectedStudentItems = [
        "username",
        "firstName",
        "lastName",
        "major",
        "classYear",
        "type",
      ];
      displayTest(sampleUsers[0], expectedStudentItems, items);
    });
  });

  describe("ProfileInfo: Faculty Tests", () => {
    beforeEach(() => {
      render(<ProfileInfo user={sampleUsers[3]} />);
    });

    test("ProfileInfo: Displays correct Faculty info", async () => {
      //the things we want displayed
      const items = await screen.findAllByTestId("profile");
      const expectedFacultyItems = [
        "username",
        "firstName",
        "lastName",
        "department",
        "title",
        "type",
      ];
      displayTest(sampleUsers[3], expectedFacultyItems, items);
    });
  });

  describe("ProfileInfo: Admin Tests", () => {
    beforeEach(() => {
      render(<ProfileInfo user={sampleUsers[4]} />);
    });

    test("ProfileInfo: Displays correct Admin info", async () => {
      //the things we want displayed
      const items = await screen.findAllByTestId("profile");
      const expectedAdminItems = [
        "username",
        "firstName",
        "lastName",
        "title",
        "type",
      ];
      displayTest(sampleUsers[4], expectedAdminItems, items);
    });
  });
});
