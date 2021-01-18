import "@testing-library/jest-dom/extend-expect";

import React from "react";

import nl from "../i18n/nl";
import { render, screen, waitFor } from "../utils/test-utils";
import NotFoundPage from "./NotFoundPage";

it("NotFoundPage renders correctly", async () => {
  render(<NotFoundPage />);

  await waitFor(() =>
    expect(
      screen.getByText(nl.translation.notFoundPage.heading)
    ).toBeInTheDocument()
  );
  await waitFor(() =>
    expect(
      screen.getByText(nl.translation.notFoundPage.paragraph, { exact: false })
    ).toBeInTheDocument()
  );
});
