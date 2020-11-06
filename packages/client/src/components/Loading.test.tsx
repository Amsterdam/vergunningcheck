import React from "react";

import { LOADING_TEXT } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders correctly on first load", () => {
    render(<Loading />);

    expect(screen.queryByTestId(LOADING_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(/laden.../i)).toBeInTheDocument();
  });
});
