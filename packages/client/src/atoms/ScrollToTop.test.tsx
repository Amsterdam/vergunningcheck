import React from "react";

import { render } from "../utils/test-utils";
import ScrollToTop from "./ScrollToTop";

window.scrollTo = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: () => jest.fn(),
}));

describe("ScrollToTop", () => {
  it("renders correctly on first load", () => {
    render(<ScrollToTop />);

    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(window.scrollTo).toBeCalledTimes(1);
  });
});
