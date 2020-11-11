import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { actions, eventNames } from "../../config/matomo";
import { MODAL } from "../../utils/test-ids";
import { act, fireEvent, render } from "../../utils/test-utils";
import EditLocationModal from "./EditLocationModal";

const matomoTrackEvent = jest.fn();
const resetChecker = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

describe("EditLocationModal", () => {
  it("Modal should render as expected", async () => {
    const { getByText, queryByTestId } = render(
      <EditLocationModal
        matomoTrackEvent={matomoTrackEvent}
        resetChecker={resetChecker}
      />
    );

    expect(getByText("Wijzig")).toBeInTheDocument();
    expect(queryByTestId(MODAL)).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(getByText("Wijzig"));
    });
    // Modal = open

    expect(queryByTestId(MODAL)).toBeInTheDocument();
    expect(matomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_EDIT_ADDRESS,
    });

    act(() => {
      fireEvent.click(getByText("Ja"));
    });
    // Modal = closed

    expect(matomoTrackEvent).toHaveBeenCalledTimes(2);
    // expect(matomoTrackEvent).toBeCalledWith({
    //   action: actions.EDIT_ADDRESS,
    //   name: `${eventNames.EDIT_ADDRESS} - ${eventNames.BACK} ${eventNames.GOTO_LOCATION}`,
    // });
    // expect(resetChecker).toHaveBeenCalledTimes(1);
  });
});
