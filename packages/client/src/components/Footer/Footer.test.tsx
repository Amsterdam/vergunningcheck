import React from "react";

import matchMedia from "../../__mocks__/matchMedia";
import { FOOTER } from "../../utils/test-ids";
import { render, screen } from "../../utils/test-utils";
import Footer from ".";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

describe("Footer", () => {
  it("renders correctly", () => {
    render(<Footer />);
    expect(screen.getByTestId(FOOTER)).toBeInTheDocument();
  });
});
