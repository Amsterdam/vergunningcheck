import React from "react";

import text from "../../i18n/nl";
import { render, screen } from "../../utils/test-utils";
import LocationNotFound from "./LocationNotFound";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

describe("LocationNotFound", () => {
  it("renders correctly correctly", () => {
    render(<LocationNotFound />);
    // Should not be in document
    expect(
      screen.queryByText(
        text.translation.common["try again or contact city of amsterdam"],
        { exact: false }
      )
    ).toBeInTheDocument();
  });
});
