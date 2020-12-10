import React from "react";

import matchMedia from "../../__mocks__/matchMedia";
import { actions, eventNames } from "../../config/matomo";
import {
  NEED_CONTACT,
  NEED_PERMIT,
  NEED_PERMIT_BUTTON,
  PERMIT_FREE,
} from "../../utils/test-ids";
import { act, fireEvent, render, screen } from "../../utils/test-utils";
import ConclusionOutcome from "./ConclusionOutcome";
import { NeedPermit, PermitFree } from "./content";

const matomoTrackEvent = jest.fn();
window.open = jest.fn();

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

describe("ConclusionOutcome", () => {
  it("renders the 'needs permit' conclusion correctly", () => {
    render(
      <ConclusionOutcome
        conclusionContent={{
          mainContent: <NeedPermit matomoTrackEvent={matomoTrackEvent} />,
          title: "title",
        }}
        matomoTrackEvent={matomoTrackEvent}
      />
    );
    // Should be in document
    expect(screen.queryByTestId(NEED_PERMIT_BUTTON)).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();

    // Shouldn't be in document
    expect(screen.queryByTestId(PERMIT_FREE)).not.toBeInTheDocument();
    expect(screen.queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();

    // Make sure the "Get Permit" Button works
    act(() => {
      fireEvent.click(screen.queryByTestId(NEED_PERMIT_BUTTON));
    });

    expect(window.open).toHaveBeenCalledTimes(1);

    expect(matomoTrackEvent).toHaveBeenCalledTimes(2); // For the active section, and the conclusion outcome.
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.HOW_TO_APPLY_FOR_A_PERMIT,
    });
  });

  it("renders the 'permit free' conclusion correctly", () => {
    render(
      <ConclusionOutcome
        conclusionContent={{
          footerContent: <PermitFree />,
          title: "title",
        }}
        matomoTrackEvent={matomoTrackEvent}
      />
    );
    // Should be in document
    expect(screen.queryByTestId(PERMIT_FREE)).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();

    // Shouldn't be in document
    expect(screen.queryByTestId(NEED_PERMIT)).not.toBeInTheDocument();
    expect(screen.queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();

    // @TODO: Write test for PRINT_BUTTON
  });
});
