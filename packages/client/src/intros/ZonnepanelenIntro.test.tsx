import React from "react";

import { render, screen } from "../utils/test-utils";
import ZonnepanelenIntro from "./ZonnepanelenIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("ZonnepanelenIntro renders correctly", () => {
  render(<ZonnepanelenIntro />);

  expect(
    screen.queryByText("nieuwe zonnepanelen of een nieuwe zonneboiler", {
      exact: false,
    })
  ).toBeInTheDocument();
});
