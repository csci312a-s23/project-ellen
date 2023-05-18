import FilterBar from "./filterBar";

import { render, fireEvent } from "@testing-library/react";

describe("filterBar: filterBar tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  test("Smoke test", () => {
    render(<FilterBar />);
  });

  test("FilterBar correctly renders hot,new,recent buttons", () => {
    const { getAllByRole } = render(<FilterBar />);
    const buttons = getAllByRole("button");
    expect(buttons).toHaveLength(4);
  });

  test("Current button is disabled when selected", () => {
    const { getByText } = render(<FilterBar currentSortFilter="hot" />);
    const currentButton = getByText("Hot");
    expect(currentButton).toBeDisabled();
  });

  test("Correctly calls setCurrentFilter with correct button", () => {
    const { getByText } = render(
      <FilterBar currentSortFilter="new" setCurrentSortFilter={handler} />
    );
    const currentButton = getByText("Hot");
    fireEvent.click(currentButton);
    expect(handler).toHaveBeenCalledWith("hot");
  });

  test("menu opens when category button clicked", () => {
    const { getByRole } = render(<FilterBar />);
    //"" is "category", just with conditional rendering it is funky
    const categoryButton = getByRole("button", { name: "" });
    fireEvent.click(categoryButton);
    const menu = getByRole("menu", { name: "" });
    expect(menu).toBeInTheDocument();
  });

  test("clicking on academics once menu is opened sorts by academic posts", () => {
    const setCurrentSortFilter = jest.fn();
    const { getByText } = render(
      <FilterBar
        currentSortFilter="new"
        setCurrentSortFilter={setCurrentSortFilter}
      />
    );

    const categoryButton = getByText("All");
    fireEvent.click(categoryButton);
    const academicsOption = getByText("Housing");
    fireEvent.click(academicsOption);
    expect(setCurrentSortFilter).toHaveBeenCalledWith("Housing");
  });
});
