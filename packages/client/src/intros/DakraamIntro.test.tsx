import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import DakraamIntro from "./DakraamIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("DakraamIntro renders correctly", () => {
  render(<DakraamIntro />);

  expect(
    screen.queryByText(
      text.translation.introPage.dakraam["intro description"],
      { exact: false }
    )
  ).toBeInTheDocument();
});
