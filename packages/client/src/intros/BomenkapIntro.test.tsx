import React from "react";

import nl from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import BomenkapIntro from "./BomenkapIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

const sentence1 =
  nl.translation.introPage["kappen-of-snoeien"]["you may need a permit"];

it("BomenkapIntro renders correctly", () => {
  render(<BomenkapIntro />);

  expect(
    screen.queryByText(sentence1, {
      exact: false,
    })
  ).toBeInTheDocument();
});
