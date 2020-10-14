import React from "react";

import { render, screen } from "../../utils/test-utils";
import LocationLoading from "./LocationLoading";

const text = "Wij zoeken het adres."; // @TODO: Load from language package

describe("LocationLoading", () => {
  it("renders correctly without props", () => {
    render(<LocationLoading loading={false} />);
    // Should not be in document
    expect(screen.queryByText(text, { exact: false })).not.toBeInTheDocument();
  });
  it("renders correctly with props", () => {
    render(<LocationLoading loading />);
    // Should be in document
    expect(screen.queryByText(text, { exact: false })).toBeInTheDocument();
  });
});
