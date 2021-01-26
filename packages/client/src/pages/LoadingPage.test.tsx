import React from "react";

import { LOADING_TEXT } from "../utils/test-ids";
import { mockMatomoTrackEvent, render, screen } from "../utils/test-utils";
import LoadingPage from "./LoadingPage";

jest.mock("../routes");

describe("LoadingPage", () => {
  it("renders correctly", () => {
    render(<LoadingPage />);

    expect(screen.getByTestId(LOADING_TEXT)).toBeInTheDocument();

    expect(mockMatomoTrackEvent).toBeCalledTimes(0);
  });
});
