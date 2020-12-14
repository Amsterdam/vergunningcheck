import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import ZonnepanelenIntro from "./ZonnepanelenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("ZonnepanelenIntro renders correctly", () => {
  render(<ZonnepanelenIntro />);

  expect(
    screen.queryByText(
      text.translation.introPage.zonnepanelen["intro description"],
      {
        exact: false,
      }
    )
  ).toBeInTheDocument();
});
