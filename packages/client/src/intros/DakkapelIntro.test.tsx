import React from "react";

import { render, screen } from "../utils/test-utils";
import DakkapelIntro from "./DakkapelIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("DakkapelIntro renders correctly", () => {
  render(<DakkapelIntro />);

  expect(
    screen.queryByText("een nieuwe dakkapel", { exact: false })
  ).toBeInTheDocument();
});
