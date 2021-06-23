import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import { actions, eventNames } from "../../config/matomo";
import {testTopic } from "../../utils/test-utils";
import {
  MODAL,
  MODAL_CONFIRM_BUTTON,
  MODAL_OPEN_BUTTON,
  NEW_CHECKER_MODAL_SAME_ADDRESS,
  RADIO_ADDRESS_1,
  RADIO_ADDRESS_2,
} from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
} from "../../utils/test-utils";
import NewCheckerModal from "./NewCheckerModal";



const mockAddress = {
  ...addressGraphQLMock[0].result.data.findAddress.exactMatch,
};

jest.mock("../../hooks/useTopicData", () => () => ({
  topicData: {
    address: mockAddress,
  },
  setTopicData: jest.fn(),
}));

describe("NewCheckerModal", () => {
  it("should render as expected", () => {
    const { queryByText, queryByTestId } = render(<NewCheckerModal />);
    expect(queryByTestId(MODAL_OPEN_BUTTON)).toBeInTheDocument();
    expect(queryByTestId(MODAL)).not.toBeInTheDocument();
    expect(queryByText(testTopic.name)).toBeNull();
    expect(window.location.href).not.toContain(testTopic.slug);

    act(() => {
      fireEvent.click(queryByTestId(MODAL_OPEN_BUTTON) as HTMLElement);
    });
    // Modal = open

    expect(queryByTestId(MODAL)).toBeInTheDocument();
    expect(queryByText(testTopic.name)).toBeInTheDocument();
    expect(queryByText("Annuleer")).toBeInTheDocument();

    // Make sure Matomo Analytics work
    // TODO: temp disabled this matamo tracking test
    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_DO_ANOTHER_CHECK,
    });
  });

  it("should open a new topic", async () => {
    const { queryByTestId } = render(<NewCheckerModal />);

    act(() => {
      fireEvent.click(queryByTestId(MODAL_OPEN_BUTTON) as HTMLElement);
    });
    // Modal = open

    // Expect the "same address" components to be rendered with this `useTopicData` mock
    expect(queryByTestId(NEW_CHECKER_MODAL_SAME_ADDRESS)).toBeInTheDocument();

    act(() => {
      // Select 'Yes' (only to mock the 'Yes')
      fireEvent.click(queryByTestId(RADIO_ADDRESS_1) as HTMLElement);
      // Select 'No' (because we don't send address data now)
      fireEvent.click(queryByTestId(RADIO_ADDRESS_2) as HTMLElement);
      // Click the new topic to open
      fireEvent.click(
        queryByTestId(`radio-checker-${testTopic.slug}`) as HTMLElement
      );

      // Because this event is not async, it should call `NO_CHOICE_HAS_BEEN_MADE`
      fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON) as HTMLElement);

      expect(mockMatomoTrackEvent).toBeCalledWith({
        action: actions.START_ANOTHER_CHECK,
        name: `${eventNames.DO_ANOTHER_CHECK} - ${eventNames.NO_CHOICE_HAS_BEEN_MADE}`,
      });
    });

    // Go to new topic
    await act(async () => {
      fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON) as HTMLElement);

      expect(mockMatomoTrackEvent).toBeCalledWith({
        action: actions.OPEN_MODAL,
        name: eventNames.OPEN_MODAL_DO_ANOTHER_CHECK,
      });
    });

    // @TODO: This test could be extended to verify that the SessionData has been updated
  });
});
