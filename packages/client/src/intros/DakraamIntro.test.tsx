import React from "react";

import { render, screen } from "../utils/test-utils";
import DakraamIntro from "./DakraamIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("DakraamIntro renders correctly", () => {
  render(<DakraamIntro />);

  expect(
    screen.queryByText(
      "Deze vergunningcheck gaat over dakramen, daklichten en lichtstraten.",
      { exact: false }
    )
  ).toBeInTheDocument();
});
