import React from "react";

import { render, screen } from "../../utils/test-utils";
import LocationNotFound from "./LocationNotFound";

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

const text = "Probeer het opnieuw."; // @TODO: Load from language package

describe("LocationNotFound", () => {
  it("renders correctly correctly", () => {
    render(<LocationNotFound />);
    // Should not be in document
    expect(screen.queryByText(text, { exact: false })).toBeInTheDocument();
  });
});
