import React from "react";

import { actions } from "../config/matomo";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
  screen,
} from "../utils/test-utils";
import Link from "./Link";

beforeEach(() => {
  jest.clearAllMocks();
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
      action: actions.CLICK_EXTERNAL_NAVIGATION,
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
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: "test",
    });
  });
  it("should not track an event", () => {
    render(<Link href="/link">link</Link>);

    const anchor = screen.queryByText("link") as HTMLElement;

    act(() => {
      fireEvent.click(anchor);
    });

    expect(mockMatomoTrackEvent).not.toBeCalled();
  });
});
