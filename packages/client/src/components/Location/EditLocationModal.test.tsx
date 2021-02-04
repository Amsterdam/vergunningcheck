import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { actions, eventNames, sections } from "../../config/matomo";
import nl from "../../i18n/nl";
import { MODAL } from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
} from "../../utils/test-utils";
import EditLocationModal from "./EditLocationModal";

jest.mock("../../hooks/useTracking");

const { edit, yes } = nl.translation.common;

describe("EditLocationModal", () => {
  it("Modal should render as expected", async () => {
    const { getByText, queryByTestId } = render(<EditLocationModal />);

    expect(getByText(edit)).toBeInTheDocument();
    expect(queryByTestId(MODAL)).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(getByText(edit));
    });
    // Modal = open

    expect(queryByTestId(MODAL)).toBeInTheDocument();
    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_EDIT_ADDRESS,
    });

    act(() => {
      fireEvent.click(getByText(yes));
    });
    // Modal = closed

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(3);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.EDIT_ADDRESS,
      name: `${eventNames.EDIT_ADDRESS} - ${eventNames.BACK} ${sections.LOCATION_INPUT}`,
    });
  });
});
