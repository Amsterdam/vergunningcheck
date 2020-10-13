import "jest-styled-components";

import React from "react";

import { render } from "../utils/test-utils";
import { ComponentWrapper } from ".";

it("ComponentWrapper renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <ComponentWrapper data-testid="component" marginBottom={100}>
      content
    </ComponentWrapper>
  );

  expect(queryByText("content")).toBeInTheDocument();
  expect(queryByTestId("component")).toBeInTheDocument();
  expect(queryByTestId("component")).toHaveStyleRule("margin-bottom", "100px");
});
