import "@testing-library/jest-dom/extend-expect";


import { getMatomoSiteId } from "./matomo";

describe("Config", () => {
  test("should load correct environment matomo siteId", () => {
    expect(getMatomoSiteId(true)).toBe(29);
    expect(getMatomoSiteId(false)).toBe(37);
  });
});
