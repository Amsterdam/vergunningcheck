import "@testing-library/jest-dom/extend-expect";

import React, { FunctionComponent } from "react";

import { render } from "../utils/test-utils";
import { getMatomoSiteId } from "./matomo";
import { topics } from ".";

const tryIntroFile = (intro: string) => {
  try {
    require(`../intros/${intro}`);
    return `Found: ${intro}`;
  } catch {
    return `Not found: ${intro}`;
  }
};

const AllIntroPages: FunctionComponent = () => (
  <>
    {topics.map((t) =>
      t.intro ? <p key={t.intro}>{tryIntroFile(t.intro)}</p> : null
    )}
  </>
);

describe("Config", () => {
  test("should load correct environment matomo siteId", () => {
    expect(getMatomoSiteId(true)).toBe(29);
    expect(getMatomoSiteId(false)).toBe(37);
  });

  it("should be able to find all Intro pages", () => {
    const { queryAllByText } = render(<AllIntroPages />);
    expect(queryAllByText(/Not found/i)).toHaveLength(0);
  });

  it("should be able to detect a missing Intro page", () => {
    topics.push({
      slug: "test-slug-for-missing-intro-page",
      intro: "IntroPageThatWillNeverExist",
      hasIMTR: false,
      name: "Test something",
      text: { heading: "Test heading" },
    });

    const { queryAllByText } = render(<AllIntroPages />);
    expect(queryAllByText(/Not found/i)).toHaveLength(1);
  });
});
