import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { actions, eventNames } from "../../config/matomo";
import { MODAL } from "../../utils/test-ids";
import { act, fireEvent, render } from "../../utils/test-utils";
import ChangeAddressModal from "./ChangeAddressModal";

const matomoTrackEvent = jest.fn();
const setActiveState = jest.fn();
const resetChecker = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

describe("ChangeAddressModal", () => {
  it("Modal should render as expected", async () => {
    const { getByText, queryByTestId } = render(
      <ChangeAddressModal
        hasIMTR
        matomoTrackEvent={matomoTrackEvent}
        resetChecker={resetChecker}
        setActiveState={setActiveState}
      >
        text
      </ChangeAddressModal>
    );

    expect(queryByTestId(MODAL)).not.toBeInTheDocument();

    // Modal = open
    act(() => {
      fireEvent.click(getByText("Wijzig"));
    });

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
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.EDIT_ADDRESS,
      name: `${eventNames.EDIT_ADDRESS} - ${eventNames.BACK} ${eventNames.GOTO_LOCATION}`,
    });
  });
});
