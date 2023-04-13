import Home from "@/pages/index";
import { render } from "@testing-library/react";
// import fetchMock from "jest-fetch-mock"
import mockRouter from "next-router-mock";
// const originalFetch = global.fetch;
// global.fetch = (url, ...params) => {
//   if (typeof url === "string" && url.startsWith("/")) {
//     return originalFetch(`http://0.0.0.0:3000${url}`, ...params);
//   }
//   return originalFetch(url, ...params);
// };

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    mockRouter.push("/");
    render(<Home />);
  });
});
