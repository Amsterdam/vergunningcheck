import React from "react";

import nl from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import ErrorBoundary from "./ErrorBoundary";

// process.env mocking
let mockIsProduction = true;
jest.mock("../config", () => {
  return jest.fn(() => mockIsProduction);
});

let mockReload = jest.fn();

it("should render correctly without error", () => {
  render(
    <ErrorBoundary>
      <h1>Without Error</h1>
    </ErrorBoundary>
  );

  expect(
    screen.getByRole("heading", { name: /without error/i })
  ).toBeInTheDocument();
});

describe("on error", () => {
  let originalLocation: Location;
  beforeEach(() => {
    const { location } = window;
    originalLocation = location;

    //@ts-ignore the operand must be optional check
    delete window.location;

    window.location = { ...location, reload: mockReload };

    jest.clearAllMocks();
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  function ErrorThrowingComponent() {
    const getError = () => {
      throw new Error("With Error");
    };

    return <>{getError()}</>;
  }

  it("should render error message", () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("heading", {
        name: nl.translation.errorMessages["error occured"],
      })
    ).toBeInTheDocument();
  });

  it("should reload current url in production", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    rerender(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // it should try reloading the app once
    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it("should not reload current url in non-production", () => {
    mockIsProduction = false;
    const { rerender } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    rerender(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // it should try reloading the app once
    expect(mockReload).not.toHaveBeenCalled();
  });
});
