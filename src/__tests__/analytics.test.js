/*import AnalyticsPage from "../pages/analytics";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import fetchMock from "fetch-mock-jest";
import { knex } from "../../knex/knex";
import { act } from "react-dom/test-utils";

//const fs = require("fs");
//const contents = fs.readFileSync("./data/SeedData.json");
//const data = JSON.parse(contents);
//jest.mock("next/router", () => require("next-router-mock"));

describe("Analytics Page Tests", () => {
    test("AnalyticsPage renders", () => {
        render(<AnalyticsPage />);
        expect(screen.queryByText("Describe your issue")).not.toBeInTheDocument();
    });

    test.skip("Selecting a new topic issue works", () => {
        render(<AnalyticsPage />);
        
        const topicSelector = screen.getByTestId("topicSel");
        fireEvent.click(topicSelector);

        const newTopic = screen.queryByText("Housing");
        fireEvent.click(newTopic);

        console.log(topicSelector);
        expect(topicSelector.value).toBe("Housing");
    });

    test.skip("Adding and removing groups works", () => {
        render(<AnalyticsPage />);
    });

    test.skip("Adding a new group adds a line to the graph", () => {
        render(<AnalyticsPage />);
    });
});
*/
