import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import SlopenIntro from "./SlopenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("SlopenIntro renders correctly", () => {
  render(<SlopenIntro />);

  expect(
    screen.queryByText(text.translation.introPage.slopen["intro description"], {
      exact: false,
    })
  ).toBeInTheDocument();
});
