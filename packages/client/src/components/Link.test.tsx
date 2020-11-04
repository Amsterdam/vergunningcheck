import React from "react";

import { act, fireEvent, render, screen } from "../utils/test-utils";
import Link from "./Link";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

const matomoTrackEvent = jest.fn();

describe("Link", () => {
  it("renders correctly", () => {
    render(
      <Link href="/link" matomoTrackEvent={matomoTrackEvent}>
        link
      </Link>
    );

    const anchor = screen.queryByText("link") as HTMLElement;
    expect(anchor).toBeInTheDocument();

    act(() => {
      fireEvent.click(anchor);
    });

    expect(matomoTrackEvent).not.toBeCalled();
  });
  it("tracks the event correctly", () => {
    render(
      <Link eventName="test" href="/link" matomoTrackEvent={matomoTrackEvent}>
        link
      </Link>
    );

    const anchor = screen.queryByText("link") as HTMLElement;

    act(() => {
      fireEvent.click(anchor);
    });

    expect(matomoTrackEvent).toBeCalled();
  });
});
