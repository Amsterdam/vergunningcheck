import React from "react";

import { urls } from "../../config";
import nl from "../../i18n/nl";
import { render, screen } from "../../utils/test-utils";
import OloRedirectPage from "./OloRedirectPage";

jest.useFakeTimers();

describe("OloRedirectPage", () => {
  it("should render and redirect correctly", () => {
    render(<OloRedirectPage />);

    expect(
      screen.getByText(nl.translation.common["one moment please"])
    ).toBeInTheDocument();

    expect(
      screen.getByText(nl.translation.oloRedirectPage.paragraph, {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(nl.translation.oloRedirectPage.link)
    ).toBeInTheDocument();

    // Fast-forward until all timers have been executed
    jest.advanceTimersByTime(3000);

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(urls.OLO_INTRO, "_self");
  });
});
