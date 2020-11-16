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
      "U wilt gaan slopen. U hebt misschien een omgevingsvergunning nodig. Het kan ook zijn dat u de sloop moet melden. Met deze vergunningcheck kunt u zien wat u moet doen. ",
      { exact: false }
    )
  ).toBeInTheDocument();
});
