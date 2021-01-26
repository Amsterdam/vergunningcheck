import React from "react";

import nl from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import BrandveiligGebruikIntro from "./BrandveiligGebruikIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("BrandveiligGebruikIntro renders correctly", () => {
  render(<BrandveiligGebruikIntro />);

  expect(
    screen.queryByText(
      nl.translation.introPage.firesafety[
        "the building must be safe and the city must be able to verify"
      ]
    )
  ).toBeInTheDocument();
});
