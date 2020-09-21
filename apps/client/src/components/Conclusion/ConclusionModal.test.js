import React from "react";

import { topics } from "../../config";
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

// Mock the location.href to see if new checker is opened
delete window.location;
window.location = { href: jest.fn() };

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

it("NewCheckerModal should render as expected", () => {
  const { queryByText, queryByTestId } = render(<NewCheckerModal />);
  expect(queryByTestId(MODAL_OPEN_BUTTON)).toBeInTheDocument();
  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
  expect(queryByText(customTopic.name)).toBeNull();
});

it("NewCheckerModal render a topic and open it", async () => {
  const { queryByText, queryByTestId } = render(
    <NewCheckerModal matomoTrackEvent={matomoTrackEvent} />
  );

  act(() => {
    fireEvent.click(queryByTestId(MODAL_OPEN_BUTTON));
  });

  expect(queryByTestId(MODAL)).toBeInTheDocument();
  expect(queryByText(customTopic.name)).toBeInTheDocument();
  expect(queryByText("Annuleer")).toBeInTheDocument();
  expect(matomoTrackEvent).toHaveBeenCalledTimes(1);

  act(() => {
    expect(window.location.href).not.toContain(customTopic.slug);
    fireEvent.click(document.getElementById(customTopic.slug));
  });

  await act(async () => {
    fireEvent.click(queryByTestId(MODAL_CONFIRM_BUTTON));
    expect(window.location.href).toContain(customTopic.slug);
  });
});
