import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "./utils/test-utils";
import { topics, isProduction, matomo } from "./config";

afterEach(cleanup);

const tryIntroFile = (intro) => {
  try {
    require(`./intros/${intro}`);
    return `Found: ${intro}`;
  } catch {
    return `Not found: ${intro}`;
  }
};

const AllIntroPages = () =>
  topics.map((t) =>
    t.intro ? <p key={t.intro}>{tryIntroFile(t.intro)}</p> : null
  );

describe("Config", () => {
  afterEach(cleanup);

  test("should load correct matomo siteId", () => {
    expect(matomo.siteId).toBe(isProduction ? 29 : 37);
  });

  it("should be able to find all Intro pages", () => {
    const { queryAllByText } = render(<AllIntroPages />);
    expect(queryAllByText(/Not found/i)).toHaveLength(0);
  });

  it("should be able to detect a missing Intro page", () => {
    topics.push({
      slug: "test-slug-for-missing-intro-page",
      intro: "IntroPageThatWillNeverExist",
    });

    const { queryAllByText } = render(<AllIntroPages />);
    expect(queryAllByText(/Not found/i)).toHaveLength(1);
  });
});
