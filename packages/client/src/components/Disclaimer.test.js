import React from "react";

import { DISCLAIMER_TEXT } from "../utils/test-ids";
import { cleanup, render } from "../utils/test-utils";
import Disclaimer from "./Disclaimer";

afterEach(cleanup);

describe("Disclaimer", () => {
  it("renders correctly", () => {
    const { getByText, queryByTestId } = render(<Disclaimer />);
    // Should be in document
    expect(queryByTestId(DISCLAIMER_TEXT)).toBeInTheDocument();
    expect(getByText("Let op")).toBeInTheDocument();
  });
});
