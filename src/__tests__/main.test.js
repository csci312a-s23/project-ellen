import Home from "@/pages/index";
import { render } from "@testing-library/react";

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});
