import React from "react";

import { render } from "../utils/test-utils";
import { Alert } from ".";

it("Alert renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <Alert content="content" data-testid="component" heading="heading">
      children
    </Alert>
  );
  expect(queryByTestId("component")).toBeInTheDocument();
  expect(queryByText("heading")).toBeInTheDocument();
  expect(queryByText("content")).toBeInTheDocument();
  expect(queryByText("children")).toBeInTheDocument();
});
