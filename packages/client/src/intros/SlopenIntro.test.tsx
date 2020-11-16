import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import SlopenIntro from "./SlopenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("SopenIntro renders correctly", () => {
  render(<SlopenIntro />);

  expect(
    screen.queryByText(
      text.translation.introPage.demolition["intro description"],
      { exact: false }
    )
  ).toBeInTheDocument();
});
