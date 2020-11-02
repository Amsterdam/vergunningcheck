import React from "react";

import text from "../../i18n/nl.json";
import { render, screen } from "../../utils/test-utils";
import LocationLoading from "./LocationLoading";

const testSentence = text.translation.common["address loading"];

describe("LocationLoading", () => {
  it("renders correctly without props", () => {
    render(<LocationLoading loading={false} />);
    // Should not be in document
    expect(
      screen.queryByText(testSentence, { exact: false })
    ).not.toBeInTheDocument();
  });
  it("renders correctly with props", () => {
    render(<LocationLoading loading />);
    // Should be in document
    expect(
      screen.queryByText(testSentence, { exact: false })
    ).toBeInTheDocument();
  });
});
