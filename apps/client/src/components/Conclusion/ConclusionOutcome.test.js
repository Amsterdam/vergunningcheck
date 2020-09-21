import React from "react";

import matchMedia from "../../__mocks__/matchMedia";
import {
  NEED_CONTACT,
  NEED_PERMIT,
  NEED_PERMIT_BUTTON,
  NO_PERMIT_NEEDED,
} from "../../utils/test-ids";
import { cleanup, render } from "../../utils/test-utils";
import { ConclusionOutcome } from "./ConclusionOutcome";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

afterEach(cleanup);

it("renders more info for permit description", () => {
  const { getByTestId } = render(
    <ConclusionOutcome needsPermit={true} matomoTrackEvent={() => {}} />
  );
  expect(getByTestId(NEED_PERMIT)).toBeTruthy();
  expect(getByTestId(NEED_PERMIT_BUTTON)).toBeTruthy();
});

it("Don't need a permit", () => {
  const { getByTestId } = render(
    <ConclusionOutcome
      needsPermit={false}
      contactConclusion={false}
      matomoTrackEvent={() => {}}
    />
  );
  expect(getByTestId(NO_PERMIT_NEEDED)).toBeTruthy();
});

it("Contact Amsterdam conclusion", () => {
  const { getByTestId } = render(
    <ConclusionOutcome
      needsPermit={false}
      contactConclusion={{
        title: "Test",
        description: "Je moet contact opnemen met amsterdam",
      }}
      matomoTrackEvent={() => {}}
    />
  );
  expect(getByTestId(NEED_CONTACT)).toBeTruthy();
});