import React from "react";

import nl from "../../i18n/nl";
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
        nl.translation.errorMessages[
          "please try again later or contact the city on"
        ],
        { exact: false }
      )
    ).toBeInTheDocument();
  });
});
