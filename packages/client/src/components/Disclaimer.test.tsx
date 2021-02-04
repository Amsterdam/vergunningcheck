import React from "react";

import text from "../i18n/nl";
import { DISCLAIMER_TEXT } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import Disclaimer from "./Disclaimer";

describe("Disclaimer", () => {
  it("renders correctly", () => {
    render(<Disclaimer />);
    // Should be in document
    expect(screen.queryByTestId(DISCLAIMER_TEXT)).toBeInTheDocument();
    expect(
      screen.getByText(text.translation.outcome.disclaimer)
    ).toBeInTheDocument();
  });
});
