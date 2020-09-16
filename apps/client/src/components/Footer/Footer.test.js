import React from "react";

import matchMedia from "../../__mocks__/matchMedia";
import { FOOTER } from "../../utils/test-ids";
import { render } from "../../utils/test-utils";
import Footer from ".";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

it("renders with text", () => {
  const { getByTestId } = render(<Footer />);
  expect(getByTestId(FOOTER)).toBeTruthy();
});
