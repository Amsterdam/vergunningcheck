import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import { actions, eventNames } from "../../config/matomo";
import { Topic } from "../../types";
import { findTopicBySlug } from "../../utils";
import {
  MODAL,
  MODAL_CONFIRM_BUTTON,
  MODAL_OPEN_BUTTON,
} from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
} from "../../utils/test-utils";
import NewCheckerModal from "./NewCheckerModal";

const customTopic = findTopicBySlug("dakraam-plaatsen") as Topic;

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
    expect(queryByText(customTopic.name)).toBeNull();
    expect(window.location.href).not.toContain(customTopic.slug);

    act(() => {
      fireEvent.click(queryByTestId(MODAL_OPEN_BUTTON) as HTMLElement);
    });
    // Modal = open

    expect(queryByTestId(MODAL)).toBeInTheDocument();
    expect(queryByText(customTopic.name)).toBeInTheDocument();
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

    // Because this event is not async, it should call `NO_CHOICE_HAS_BEEN_MADE`
    fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON) as HTMLElement);

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
