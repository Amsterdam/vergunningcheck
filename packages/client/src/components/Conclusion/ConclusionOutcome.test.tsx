import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import { actions, eventNames } from "../../config/matomo";
import {
  NEED_CONTACT,
  NEED_PERMIT,
  NEED_PERMIT_BUTTON,
  PERMIT_FREE,
} from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
  screen,
} from "../../utils/test-utils";
import ConclusionOutcome from "./ConclusionOutcome";
import { NeedPermit, PermitFree } from "./content";

describe("ConclusionOutcome", () => {
  it("renders NEED_PERMIT conclusion correctly", () => {
    render(
      <ConclusionOutcome
        conclusionContent={{
          mainContent: <NeedPermit />,
          title: "title",
        }}
        outcomeType={ClientOutcomes.NEED_PERMIT}
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
      // fireEvent.click(queryByTestId(NEED_PERMIT_BUTTON) as any);
      fireEvent.click(screen.queryByTestId(NEED_PERMIT_BUTTON) as any);
    });

    expect(window.open).toHaveBeenCalledTimes(1);

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(2); // For the active section, and the conclusion outcome.
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.HOW_TO_APPLY_FOR_A_PERMIT,
    });
  });

  it("renders the PERMIT_FREE conclusion correctly", () => {
    render(
      <ConclusionOutcome
        conclusionContent={{
          footerContent: <PermitFree />,
          title: "title",
        }}
        outcomeType={ClientOutcomes.PERMIT_FREE}
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
