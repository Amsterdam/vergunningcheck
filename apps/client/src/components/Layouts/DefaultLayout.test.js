import React from "react";

import { render } from "../../utils/test-utils";
import DefaultLayout from "./DefaultLayout";

describe("DefaultLayout", () => {
  it("renders with text", () => {
    const { queryByText } = render(
      <DefaultLayout heading="title">DefaultLayout</DefaultLayout>
    );
    expect(queryByText("DefaultLayout")).toBeInTheDocument();
    expect(queryByText("title")).toBeInTheDocument();
  });
});
