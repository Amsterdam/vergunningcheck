import React from "react";

import { act, fireEvent, render, screen } from "../utils/test-utils";
import Link from "./Link";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

const mockMatomoTrackEvent = jest.fn();
jest.mock("../hooks/useTracking", () => {
  return jest.fn(() => ({
    matomoTrackEvent: mockMatomoTrackEvent,
  }));
});

describe("Link", () => {
  it("renders correctly", () => {
    render(
      <Link href="/link" eventName="test">
        link
      </Link>
    );

    const anchor = screen.queryByText("link") as HTMLElement;
    expect(anchor).toBeInTheDocument();

    act(() => {
      fireEvent.click(anchor);
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: "uitgaande links",
      name: "test",
    });
  });
  it("tracks the event correctly", () => {
    render(
      <Link eventName="test" href="/link">
        link
      </Link>
    );

    const anchor = screen.queryByText("link") as HTMLElement;

    act(() => {
      fireEvent.click(anchor);
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: "uitgaande links",
      name: "test",
    });
  });
});
