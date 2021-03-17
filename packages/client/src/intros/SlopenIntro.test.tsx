import React from "react";

import nl from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import SlopenIntro from "./SlopenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

const sentence1 =
  nl.translation.introPage.slopen["you may need a permit or to report"];
const sentence2 =
  nl.translation.introPage.common[
    "sometimes it's written in a destination plan that a permit is required"
  ];

it("SlopenIntro renders correctly", () => {
  render(<SlopenIntro />);

  expect(
    screen.queryByText(sentence1, {
      exact: false,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByText(sentence2, {
      exact: false,
    })
  ).toBeInTheDocument();
});
