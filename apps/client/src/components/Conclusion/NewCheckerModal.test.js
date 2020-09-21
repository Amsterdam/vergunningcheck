import React from "react";

import { topics } from "../../config";
import { actions, eventNames } from "../../config/matomo";
import {
  MODAL,
  MODAL_CONFIRM_BUTTON,
  MODAL_OPEN_BUTTON,
} from "../../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../../utils/test-utils";
import NewCheckerModal from "./NewCheckerModal";

const matomoTrackEvent = jest.fn();
const customTopic = topics[2]; // Dakraam checker

window.scrollTo = jest.fn();

afterEach(() => {
  // Mock the location.href to see if new checker is opened
  delete window.location;
  window.location = { href: jest.fn() };

  cleanup();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

it("NewCheckerModal should render as expected", () => {
  const { queryByText, queryByTestId } = render(
    <NewCheckerModal matomoTrackEvent={matomoTrackEvent} />
  );
  expect(queryByTestId(MODAL_OPEN_BUTTON)).toBeInTheDocument();
  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
  expect(queryByText(customTopic.name)).toBeNull();
  expect(window.location.href).not.toContain(customTopic.slug);

  act(() => {
    fireEvent.click(queryByTestId(MODAL_OPEN_BUTTON));
  });
  // Modal = open

  expect(queryByTestId(MODAL)).toBeInTheDocument();
  expect(queryByText(customTopic.name)).toBeInTheDocument();
  expect(queryByText("Annuleer")).toBeInTheDocument();

  // Make sure Matomo Analytics work
  expect(matomoTrackEvent).toHaveBeenCalledTimes(1);
  expect(matomoTrackEvent).toBeCalledWith({
    action: actions.OPEN_MODAL,
    name: eventNames.DO_ANOTHER_CHECK,
  });
});

it("NewCheckerModal should open a new topic", async () => {
  const { queryByTestId } = render(
    <NewCheckerModal matomoTrackEvent={matomoTrackEvent} />
  );

  act(() => {
    fireEvent.click(queryByTestId(MODAL_OPEN_BUTTON));
  });
  // Modal = open

  act(() => {
    // Select 'Yes' (only to mock the 'Yes')
    fireEvent.click(document.getElementById("address-input-1"));
    // Select 'No' (because we don't send address data now)
    fireEvent.click(document.getElementById("address-input-2"));
    // Click the new topic to open
    fireEvent.click(document.getElementById(customTopic.slug));

    // Because this event is not async, it should call `NO_CHOISE_HAS_BEEN_MADE`
    fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON));
    expect(matomoTrackEvent).toHaveBeenCalledTimes(3);
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.START_ANOTHER_CHECK,
      name: eventNames.NO_CHOISE_HAS_BEEN_MADE,
    });
  });

  // Go to new topic
  await act(async () => {
    fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON));

    expect(matomoTrackEvent).toHaveBeenCalledTimes(4);
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.OPEN_MODAL,
      name: eventNames.DO_ANOTHER_CHECK,
    });

    expect(window.location.href).toContain(customTopic.slug);
  });

  // @TODO: This test could be extended to verify that the SessionData has been updated
});
