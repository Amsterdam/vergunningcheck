import "jest-styled-components";

import { ascDefaultTheme, themeSpacing } from "@amsterdam/asc-ui";
import React from "react";

import { render, screen } from "../utils/test-utils";
import { PrintButton } from ".";

describe("PrintButton", () => {
  it("renders correctly by default", () => {
    render(<PrintButton>content</PrintButton>);

    expect(screen.queryByText("content")).toBeInTheDocument();
    expect(screen.queryByText("content")).toHaveStyleRule(
      "margin-bottom",
      themeSpacing(5)({ theme: ascDefaultTheme })
    );
  });
  it("renders correctly with props", () => {
    render(<PrintButton marginBottom={1}>content</PrintButton>);

    expect(screen.queryByText("content")).toHaveStyleRule(
      "margin-bottom",
      "1px"
    );
  });
});
