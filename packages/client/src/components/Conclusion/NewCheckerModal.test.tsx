import React from "react";

import { Topic } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import { findTopicBySlug } from "../../utils";
import {
  MODAL,
  MODAL_CONFIRM_BUTTON,
  MODAL_OPEN_BUTTON,
  RADIO_ADDRESS_1,
  RADIO_ADDRESS_2,
} from "../../utils/test-ids";
import { act, fireEvent, render } from "../../utils/test-utils";
import NewCheckerModal from "./NewCheckerModal";

const customTopic = findTopicBySlug("dakraam-plaatsen") as Topic;

const mockMatomoTrackEvent = jest.fn();
jest.mock("../../hooks/useTracking", () => {
  return jest.fn(() => ({
    matomoTrackEvent: mockMatomoTrackEvent,
  }));
});

it("NewCheckerModal should render as expected", () => {
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

it("NewCheckerModal should open a new topic", async () => {
  const { queryByTestId } = render(<NewCheckerModal />);

  act(() => {
    fireEvent.click(queryByTestId(MODAL_OPEN_BUTTON) as HTMLElement);
  });
  // Modal = open

  act(() => {
    // Select 'Yes' (only to mock the 'Yes')
    fireEvent.click(queryByTestId(RADIO_ADDRESS_1) as HTMLElement);
    // Select 'No' (because we don't send address data now)
    fireEvent.click(queryByTestId(RADIO_ADDRESS_2) as HTMLElement);
    // Click the new topic to open
    fireEvent.click(
      queryByTestId(`radio-checker-${customTopic.slug}`) as HTMLElement
    );

    // Because this event is not async, it should call `NO_CHOICE_HAS_BEEN_MADE`
    fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON) as HTMLElement);

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(3);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.START_ANOTHER_CHECK,
      name: `${eventNames.DO_ANOTHER_CHECK} - ${eventNames.NO_CHOICE_HAS_BEEN_MADE}`,
    });
  });

  // Go to new topic
  await act(async () => {
    fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON) as HTMLElement);

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(4);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.OPEN_MODAL,
      name: eventNames.OPEN_MODAL_DO_ANOTHER_CHECK,
    });

    // expect(window.location.href).toContain(customTopic.slug);
  });

  // @TODO: This test could be extended to verify that the SessionData has been updated
});
