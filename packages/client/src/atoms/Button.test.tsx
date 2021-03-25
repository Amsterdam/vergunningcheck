import "jest-styled-components";

import { ascDefaultTheme, themeSpacing } from "@amsterdam/asc-ui";
import React from "react";

import { render, screen } from "../utils/test-utils";
import { Button } from ".";

describe("PrintButton", () => {
  it("renders correctly by default", () => {
    render(<Button>content</Button>);

    expect(screen.queryByText("content")).toBeInTheDocument();

    expect(screen.queryByText("content")).toHaveStyleRule("margin-bottom", "0");
  });
  it("renders correctly with props", () => {
    render(<Button marginBottom={1}>content</Button>);

    expect(screen.queryByText("content")).toHaveStyleRule(
      "margin-bottom",
      themeSpacing(1)({ theme: ascDefaultTheme })
    );
  });
});
