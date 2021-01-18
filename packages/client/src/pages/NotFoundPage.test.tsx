import "@testing-library/jest-dom/extend-expect";

import React from "react";

import nl from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import NotFoundPage from "./NotFoundPage";

it("NotFoundPage renders correctly", async () => {
  render(<NotFoundPage />);

  expect(
    screen.getByText(nl.translation.notFoundPage.heading)
  ).toBeInTheDocument();
  expect(
    screen.getByText(nl.translation.notFoundPage.paragraph, { exact: false })
  ).toBeInTheDocument();
});
