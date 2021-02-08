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
import { NeedPermit, OutcomeContent, PermitFree } from "./";

describe("OutcomeContent", () => {
  it("renders NEED_PERMIT outcome correctly", () => {
    render(
      <OutcomeContent
        outcomeContent={{
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

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.HOW_TO_APPLY_FOR_A_PERMIT,
    });
  });

  it("renders the PERMIT_FREE outcome correctly", () => {
    render(
      <OutcomeContent
        outcomeContent={{
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
