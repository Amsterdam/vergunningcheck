import React from "react";
import { render } from "../../utils/test-utils";
import Footer from ".";
import { FOOTER } from "../../utils/test-ids";

it("renders with text", () => {
  const { getByTestId } = render(<Footer />);
  expect(getByTestId(FOOTER)).toBeTruthy();
});
