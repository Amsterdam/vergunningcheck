import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { urls } from "../../config";
import nl from "../../i18n/nl";
import { render, screen } from "../../utils/test-utils";
import OloRedirectPage from "./OloRedirectPage";

jest.useFakeTimers();

describe("OloRedirectPage", () => {
  const { open: originalWindowOpen } = window;

  beforeEach(() => {
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = originalWindowOpen;
  });

  it("should render and redirect correctly", async () => {
    render(<OloRedirectPage />);

    const headingText = nl.translation.oloRedirectPage.heading;
    await screen.findByText(headingText, {
      exact: false,
    });
    const bodyText = nl.translation.oloRedirectPage.paragraph;
    await screen.findByText(bodyText, { exact: false });
    const linkText = nl.translation.oloRedirectPage.link;
    await screen.findByText(linkText, { exact: false });

    // schedule redirect
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);

    // Fast-forward until all timers have been executed
    jest.advanceTimersByTime(3000);

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(urls.OLO_INTRO, "_self");
  });
});
