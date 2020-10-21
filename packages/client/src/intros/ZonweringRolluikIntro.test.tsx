import React from "react";

import { render, screen } from "../utils/test-utils";
import ZonweringRolluikIntro from "./ZonweringRolluikIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

it("ZonweringRolluikIntro renders correctly", () => {
  render(<ZonweringRolluikIntro />);

  expect(
    screen.queryByText("zonwering, rolhek, rolluik of luik", { exact: false })
  ).toBeInTheDocument();
});
