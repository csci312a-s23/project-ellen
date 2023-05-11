import AnalyticsDisplay from "../pages/analytics";
import LineChart from "../components/analytics/LineChart";
import MakeGroup from "../pages/analytics";
import { render, screen, fireEvent } from "@testing-library/react";
import { knex } from "../../knex/knex";
import { ResizeObserver } from "resize-observer";

describe("Analytics Page Tests", () => {
  window.ResizeObserver = ResizeObserver;
  beforeAll(() => {
    return knex.migrate.rollback().then(() => knex.migrate.latest());
  });
  beforeAll(() => {
    return knex.seed.run();
  });

  describe("Smoke Test Renderings", () => {
    test("Analytics page renders without the chart", async () => {
      render(<AnalyticsDisplay renderChart={false} />);
      expect(screen.getByTestId("wholepage")).toBeInTheDocument();
    });
    test("Analytics Chart renders", async () => {
      const categories = [
        {
          // filters
          filters: {
            classes: [],
            majors: [],
            athletics: [],
            misc: [],
          },

          // for the graph
          label: "All",
          backgroundColor: `#808080`,
          borderColor: `#808080`,
        },
      ];
      render(
        <LineChart
          categories={categories}
          compare="Housing"
          setcompare={jest.fn()}
          renderChart
        />
      );
    });
    test("Analytics Page renders with the chart", async () => {
      render(<AnalyticsDisplay renderChart />);
    });
  });
  describe("Test User Interactions", () => {
    test("Selecting a new topic issue works", async () => {
      render(<AnalyticsDisplay renderChart={false} />);
      expect(screen.getByTestId("labelselect")).toBeInTheDocument();
      const topicSelector = screen.getByRole("button", { name: "Housing" });
      fireEvent.mouseDown(topicSelector);
      expect(
        screen.getByTestId("labelselect-Registration")
      ).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("labelselect-Registration"));
      expect(
        screen.getByRole("button", { name: "Registration" })
      ).toBeInTheDocument();
    });
    test("Adding groups works", async () => {
      render(<AnalyticsDisplay renderChart={false} />);
      const topicSelector = screen.getByRole("button", { name: "+New" });
      fireEvent.click(topicSelector);
      const groups = screen.getAllByRole("button", { name: "Group Name" });
      expect(groups).toHaveLength(2);
    });
    test("Deleting a new group works", async () => {
      render(<AnalyticsDisplay renderChart={false} />);
      // add the groups
      const topicSelector = screen.getByRole("button", { name: "+New" });
      fireEvent.click(topicSelector);
      const groups = screen.getAllByRole("button", { name: "Group Name" });
      expect(groups).toHaveLength(2);

      // now remove them
      let deletes = screen.getAllByTestId("deletebtn");
      expect(deletes).toHaveLength(2);
      fireEvent.click(deletes[0]);
      deletes = screen.getAllByTestId("deletebtn");
      expect(deletes).toHaveLength(1);
    });
    test("We can modify group selectors", async () => {
      const categories = [
        {
          // filters
          filters: {
            classes: [],
            majors: [],
            athletics: [],
            misc: [],
          },
          // for the graph
          label: "All",
          backgroundColor: `#808080`,
          borderColor: `#808080`,
        },
      ];
      render(
        <MakeGroup
          c={categories[0]}
          categories={categories}
          setCategories={jest.fn}
        />
      );
      const groupSel = screen.getByRole("button", { name: "Group Name" });
      fireEvent.click(groupSel);

      expect(screen.getByTestId("accordiondetails")).toBeInTheDocument(); // check that the accordian is open
      const dSels = screen.getAllByTestId("dropdown-select");
      const DSclass = dSels[0].querySelector("div"); // get the dropdown button
      expect(DSclass).toBeInTheDocument();
      fireEvent.mouseDown(DSclass); // open the dropdown

      const option = screen.getAllByTestId("options-dropdown")[0];
      expect(option).toBeInTheDocument(); // expect the dropdown display to be open
      fireEvent.mouseDown(option); // select an item from the dropdown
      fireEvent.mouseDown(DSclass); // close the dropdown
      expect(screen.getByText("2023")).toBeInTheDocument(); // check that the chip is still displayed
    });
  });
});
