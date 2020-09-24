import React from "react";

import addressMock from "../__mocks__/addressMock";
import matchMedia from "../__mocks__/matchMedia";
import { EDIT_BUTTON } from "../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../utils/test-utils";
import RegisterLookupSummary from "./RegisterLookupSummary";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

afterEach(cleanup);

it("RegisterLookupSummary renders correctly", () => {
  const matomoTrackEvent = jest.fn();
  const setActiveState = jest.fn();

  const { queryByTestId, queryByText } = render(
    <RegisterLookupSummary
      address={addressMock}
      displayZoningPlans
      matomoTrackEvent={matomoTrackEvent}
      setActiveState={setActiveState}
      topic={{}}
    />
  );

  expect(queryByText("Monument:")).toBeInTheDocument();
  expect(queryByText("Het gebouw is een monument.")).toBeInTheDocument();
  expect(
    queryByText("Het gebouw ligt in een beschermd stads- of dorpsgezicht.")
  ).toBeInTheDocument();
  expect(queryByText("zoningplan")).toBeInTheDocument();

  expect(queryByTestId(EDIT_BUTTON)).toBeInTheDocument();

  act(() => {
    fireEvent.click(queryByTestId(EDIT_BUTTON));
  });

  expect(matomoTrackEvent).toBeCalledTimes(1);

  // @TODO: finish this test when we work on the Location Component
  // Lines to test: 39,61,69,70,80
});
