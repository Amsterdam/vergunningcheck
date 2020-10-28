import React from "react";

import { render, screen } from "../utils/test-utils";
import KozijnenIntro from "./KozijnenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("KozijnenIntro renders correctly", () => {
  render(<KozijnenIntro />);

  expect(
    screen.queryByText(
      "Deze vergunningcheck gaat over kozijnen, deuren, ramen en panelen.",
      { exact: false }
    )
  ).toBeInTheDocument();
});
