import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import DakkapelIntro from "./DakkapelIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("DakkapelIntro renders correctly", () => {
  render(<DakkapelIntro />);

  expect(
    screen.queryByText(
      text.translation.introPage.dakkapel["intro description"],
      { exact: false }
    )
  ).toBeInTheDocument();
});
