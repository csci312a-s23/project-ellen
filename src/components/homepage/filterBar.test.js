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
    expect(buttons).toHaveLength(2);
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
});
