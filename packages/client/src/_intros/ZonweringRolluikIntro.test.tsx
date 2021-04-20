import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import ZonweringRolluikIntro from "./ZonweringRolluikIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("ZonweringRolluikIntro renders correctly", () => {
  render(<ZonweringRolluikIntro />);

  expect(
    screen.queryByText(
      text.translation.introPage.zonwering["intro description"],
      { exact: false }
    )
  ).toBeInTheDocument();
});
