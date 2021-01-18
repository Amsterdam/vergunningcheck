import React from "react";

import nl from "../i18n/nl";
import { mockMatomoTrackEvent, render, screen } from "../utils/test-utils";
import ErrorPage from "./ErrorPage";

jest.mock("../routes");

describe("ErrorPage", () => {
  it("renders correctly without props", () => {
    render(<ErrorPage />);

    expect(
      screen.getByText(nl.translation.errorMessages["error occured"])
    ).toBeInTheDocument();

    expect(mockMatomoTrackEvent).toBeCalledTimes(0);
  });
  it("renders correctly with props", () => {
    const errorMock = {
      message: "message",
      stack: "stack",
    };
    render(<ErrorPage error={errorMock} />);

    expect(screen.getByText("message")).toBeInTheDocument();
    expect(screen.getByText("stack")).toBeInTheDocument();

    // Default header should be the same
    expect(
      screen.getByText(nl.translation.errorMessages["error occured"])
    ).toBeInTheDocument();
  });
});
