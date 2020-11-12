import React from "react";

import { render, screen } from "../utils/test-utils";
import SlopenIntro from "./SlopenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("SopenIntro renders correctly", () => {
  render(<SlopenIntro />);

  expect(
    screen.queryByText(
      "Deze vergunningcheck gaat over slopen van bouwwerken.",
      { exact: false }
    )
  ).toBeInTheDocument();
});
