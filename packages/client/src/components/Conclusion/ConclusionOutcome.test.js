import React from "react";

import matchMedia from "../../__mocks__/matchMedia";
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
import NeedPermitFooter from "./NeedPermitFooter";
import NoPermitDescription from "./NoPermitDescription";

const matomoTrackEvent = jest.fn();
window.open = jest.fn();

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

describe("ConclusionOutcome", () => {
  it("renders the 'needs permit' conclusion correctly", () => {
    const { getByText, queryByTestId } = render(
      <ConclusionOutcome
        conclusionContent={{
          footerContent: <NeedPermitFooter />,
          mainContent: (
            <NeedPermitContent matomoTrackEvent={matomoTrackEvent} />
          ),
          title: "title",
        }}
        matomoTrackEvent={matomoTrackEvent}
      />
    );
    // Should be in document
    expect(queryByTestId(NEED_PERMIT)).toBeInTheDocument();
    expect(queryByTestId(NEED_PERMIT_BUTTON)).toBeInTheDocument();
    expect(getByText("title")).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();

    // Make sure the "Get Permit" Button works
    act(() => {
      fireEvent.click(queryByTestId(NEED_PERMIT_BUTTON));
    });

    expect(window.open).toHaveBeenCalledTimes(1);

    expect(matomoTrackEvent).toHaveBeenCalledTimes(2); // For the active section, and the conclusion outcome.
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.PERMIT_INFORMATION,
    });
  });

  it("renders the 'permit free' conclusion correctly", () => {
    const { getByText, queryByTestId } = render(
      <ConclusionOutcome
        conclusionContent={{
          footerContent: <NoPermitDescription />,
          title: "title",
        }}
        matomoTrackEvent={matomoTrackEvent}
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
