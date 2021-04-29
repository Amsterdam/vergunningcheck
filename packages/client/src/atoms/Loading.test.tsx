import React from "react";

import nl from "../i18n/nl";
import { LOADING_TEXT } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders correctly on first load", () => {
    render(<Loading />);

    expect(screen.queryByTestId(LOADING_TEXT)).toBeInTheDocument();
    expect(
      screen.queryByText(nl.translation.common.loading)
    ).toBeInTheDocument();
  });
  it("renders correctly with props", () => {
    const message = nl.translation.common["address loading"];
    render(<Loading message={message} />);

    expect(screen.queryByTestId(LOADING_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(message)).toBeInTheDocument();
  });
});
