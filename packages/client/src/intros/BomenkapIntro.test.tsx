import React from "react";

import nl from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import BomenkapIntro from "./BomenkapIntro";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

const sentence1 = nl.translation.introPage.bomenkap["you may need a permit"];
const sentence2 = nl.translation.introPage.bomenkap["intro exception"];

it("BomenkapIntro renders correctly", () => {
  render(<BomenkapIntro />);

  expect(
    screen.queryByText(sentence1, {
      exact: false,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByText(sentence2, {
      exact: false,
    })
  ).toBeInTheDocument();
});
