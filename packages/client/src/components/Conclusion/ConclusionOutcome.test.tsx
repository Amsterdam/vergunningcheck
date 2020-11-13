import React from "react";

import { actions, eventNames } from "../../config/matomo";
import {
  NEED_CONTACT,
  NEED_PERMIT,
  NEED_PERMIT_BUTTON,
  NO_PERMIT_NEEDED,
} from "../../utils/test-ids";
import { act, fireEvent, render } from "../../utils/test-utils";
import ConclusionOutcome from "./ConclusionOutcome";
import NeedPermitContent from "./NeedPermitContent";
import NoPermitDescription from "./NoPermitDescription";

const mockMatomoTrackEvent = jest.fn();
jest.mock("../../hooks/useTracking", () => {
  return jest.fn(() => ({
    matomoTrackEvent: mockMatomoTrackEvent,
  }));
});

describe("ConclusionOutcome", () => {
  it("renders the 'needs permit' conclusion correctly", () => {
    const { getByText, queryByTestId } = render(
      <ConclusionOutcome
        conclusionContent={{
          mainContent: <NeedPermitContent />,
          title: "title",
        }}
      />
    );

    // Should be in document
    expect(queryByTestId(NEED_PERMIT_BUTTON)).toBeInTheDocument();
    expect(getByText("title")).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();

    // Make sure the "Get Permit" Button works
    act(() => {
      fireEvent.click(queryByTestId(NEED_PERMIT_BUTTON) as any);
    });

    expect(window.open).toHaveBeenCalledTimes(1);

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(2); // For the active section, and the conclusion outcome.
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.HOW_TO_APPLY_FOR_A_PERMIT,
    });
  });

  it("renders the 'permit free' conclusion correctly", () => {
    const { getByText, queryByTestId } = render(
      <ConclusionOutcome
        conclusionContent={{
          footerContent: <NoPermitDescription />,
          title: "title",
        }}
      />
    );
    // Should be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).toBeInTheDocument();
    expect(getByText("title")).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NEED_PERMIT)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();

    // @TODO: Write test for PRINT_BUTTON
  });
});
