import React from "react";

import * as config from "../config";
import { render } from "../utils/test-utils";
import HomePage from "./HomePage";

const mockConfig = config as { isProduction?: boolean };

const mockSetItem = jest.fn(() => null);

Object.defineProperty(window, "localStorage", {
  value: {
    setItem: mockSetItem,
  },
});

jest.mock("../config", () => ({
  ...(jest.requireActual("../config") as {}),
  __esModule: true,
  isProduction: undefined,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Homepage", () => {
  it("renders correctly on production", () => {
    // Enable `isProduction`
    mockConfig.isProduction = true;

    render(<HomePage />);

    expect(mockSetItem).toBeCalledWith("doNotTrack", "true");
  });

  it("renders correctly on other environments", () => {
    // Disable `isProduction`
    mockConfig.isProduction = false;

    render(<HomePage />);

    expect(mockSetItem).not.toBeCalled();
  });
});
