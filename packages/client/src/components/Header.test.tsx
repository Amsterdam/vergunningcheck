import React from "react";

import { actions, eventNames, sections } from "../config/matomo";
import { LOGO_WRAPPER } from "../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
  screen,
} from "../utils/test-utils";
import Header from "./Header";

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});

describe("Header", () => {
  it("Header renders correctly on developement", () => {
    process.env = Object.assign(process.env, {
      NODE_ENV: "developement",
    });

    render(<Header />);

    expect(screen.getByText("Amsterdam.nl")).toBeInTheDocument();
    expect(screen.getByTestId(LOGO_WRAPPER).getAttribute("href")).toEqual("/");

    act(() => {
      fireEvent.click(screen.getByTestId(LOGO_WRAPPER));
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: `${eventNames.LOGO} - ${sections.HEADER}`,
    });
  });

  it("Header renders correctly on production", () => {
    process.env = Object.assign(process.env, {
      NODE_ENV: "production",
    });

    render(<Header />);

    expect(screen.getByTestId(LOGO_WRAPPER).getAttribute("href")).toEqual(
      "https://amsterdam.nl/"
    );
  });
});
