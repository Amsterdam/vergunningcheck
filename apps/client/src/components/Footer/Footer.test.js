import React from "react";
import { render } from "../../utils/test-utils";
import Footer from ".";

it("renders with text", () => {
  const footer = render(<Footer />);
  expect(footer).toMatchSnapshot();
});
