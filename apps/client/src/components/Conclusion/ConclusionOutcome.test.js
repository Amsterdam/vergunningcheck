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
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

afterEach(cleanup);

describe("ConclusionOutcome", () => {
  xit("renders more info for permit description", () => {
    const { getByTestId } = render(
      <ConclusionOutcome needPermit={true} matomoTrackEvent={() => {}} />
    );
    expect(getByTestId(NEED_PERMIT)).toBeTruthy();
    expect(getByTestId(NEED_PERMIT_BUTTON)).toBeTruthy();
  });

  xit("Don't need a permit", () => {
    const { getByTestId } = render(
      <ConclusionOutcome
        needPermit={false}
        contactConclusion={false}
        matomoTrackEvent={() => {}}
      />
    );
    expect(getByTestId(NO_PERMIT_NEEDED)).toBeTruthy();
  });

  xit("Contact Amsterdam conclusion", () => {
    const { getByTestId } = render(
      <ConclusionOutcome
        needPermit={false}
        contactConclusion={{
          title: "Test",
          description: "Je moet contact opnemen met amsterdam",
        }}
        matomoTrackEvent={() => {}}
      />
    );
    expect(getByTestId(NEED_CONTACT)).toBeTruthy();
  });

  xit("renders the 'needs permit' conclusion correctly", () => {
    const { queryByTestId } = render(<ConclusionOutcome needsPermit={true} />);
    // Should be in document
    expect(queryByTestId(NEED_PERMIT)).toBeInTheDocument();
    expect(queryByTestId(NEED_PERMIT_BUTTON)).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();
  });

  xit("renders the 'permit free' conclusion correctly", () => {
    const { queryByTestId } = render(
      <ConclusionOutcome needsPermit={false} contactConclusion={false} />
    );
    // Should be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NEED_PERMIT)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();
  });

  xit("renders the 'needs contact' conclusion correctly", () => {
    const { queryByTestId, queryByText } = render(
      <ConclusionOutcome
        contactConclusion={{
          title: "title",
          description: "needs contact",
        }}
      />
    );

    // Should be in document
    expect(queryByTestId(NEED_CONTACT)).toBeInTheDocument();
    expect(queryByText("needs contact")).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_PERMIT)).not.toBeInTheDocument();
  });
});
