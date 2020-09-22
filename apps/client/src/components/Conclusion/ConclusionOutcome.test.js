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
  it("renders the 'needs permit' conclusion correctly", () => {
    const { queryByTestId } = render(<ConclusionOutcome needsPermit={true} />);
    // Should be in document
    expect(queryByTestId(NEED_PERMIT)).toBeInTheDocument();
    expect(queryByTestId(NEED_PERMIT_BUTTON)).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();
  });

  it("renders the 'permit free' conclusion correctly", () => {
    const { queryByTestId } = render(
      <ConclusionOutcome
        needsPermit={false}
        contactConclusion={false}
        matomoTrackEvent={() => {}}
      />
    );
    // Should be in document
    expect(queryByTestId(NO_PERMIT_NEEDED)).toBeInTheDocument();

    // Shouldn't be in document
    expect(queryByTestId(NEED_PERMIT)).not.toBeInTheDocument();
    expect(queryByTestId(NEED_CONTACT)).not.toBeInTheDocument();
  });

  it("renders the 'needs contact' conclusion correctly", () => {
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
