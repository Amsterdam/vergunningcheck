import React from "react";

import { FOOTER } from "../../utils/test-ids";
import { render } from "../../utils/test-utils";
import Footer from ".";

it("renders with text", () => {
  const { getByTestId } = render(<Footer />);
  expect(getByTestId(FOOTER)).toBeTruthy();
});
