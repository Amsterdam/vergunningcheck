import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import KozijnenIntro from "./KozijnenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("KozijnenIntro renders correctly", () => {
  render(<KozijnenIntro />);

  expect(
    screen.queryByText(
      text.translation.introPage.kozijnen["intro description"],
      { exact: false }
    )
  ).toBeInTheDocument();
});
