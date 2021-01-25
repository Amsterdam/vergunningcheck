import "jest-styled-components";

import { captureException } from "@sentry/browser";
import React from "react";

import { FIGCAPTION, FIGURE, IMG } from "../utils/test-ids";
import { fireEvent, render, screen } from "../utils/test-utils";
import Visual from "./Visual";

jest.mock("@sentry/browser");

describe("Visual", () => {
  it("renders correctly without props", () => {
    render(<Visual src="folder/image.jpg" />);

    expect(screen.queryByTestId(FIGURE)).toBeInTheDocument();
    expect(screen.queryByTestId(FIGURE)).toHaveStyleRule("height", "0");

    expect(screen.queryByTestId(IMG)).toHaveStyleRule(
      "border",
      "1px solid transparent"
    );
    expect(screen.queryByTestId(IMG)?.getAttribute("src")).toBe(
      "folder/image.jpg"
    );

    expect(screen.queryByTestId(FIGCAPTION)).not.toBeInTheDocument();
  });

  it("renders correctly with props", () => {
    render(<Visual alt="alt text" src="folder/image.jpg" title="title" />);

    expect(screen.queryByAltText("alt text")).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByTestId(FIGCAPTION)).toBeInTheDocument();
  });

  it("renders correctly with on load", () => {
    const { container } = render(
      <Visual alt="alt text" src="folder/image.jpg" title="title" />
    );

    const img = container.querySelector("img") as HTMLImageElement;
    expect(img).not.toBeNull();
    fireEvent(img, new Event("load"));
    expect(img).toHaveStyleRule("border", "1px solid #767676");
  });

  it("renders correctly with on error", () => {
    const { container } = render(
      <Visual alt="alt text" src="folder/image.jpg" title="title" />
    );

    const img = container.querySelector("img") as HTMLImageElement;
    expect(img).not.toBeNull();
    fireEvent(img, new Event("error"));
    expect(img).toHaveStyleRule("border", "1px solid #767676");
  });

  it("renders correctly without props", () => {
    render(<Visual src="folder/image.jpg" />);

    expect(screen.queryByTestId(FIGURE)).toBeInTheDocument();
    expect(screen.queryByTestId(FIGURE)).toHaveStyleRule("height", "0");

    expect(screen.queryByTestId(IMG)).toHaveStyleRule(
      "border",
      "1px solid transparent"
    );
    expect(screen.queryByTestId(IMG)?.getAttribute("src")).toBe(
      "folder/image.jpg"
    );

    expect(screen.queryByTestId(FIGCAPTION)).not.toBeInTheDocument();
  });

  it("renders correctly with props", () => {
    render(<Visual alt="alt text" src="folder/image.jpg" title="title" />);

    expect(screen.queryByAltText("alt text")).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByTestId(FIGCAPTION)).toBeInTheDocument();
  });

  it("renders correctly with on load", () => {
    const { container } = render(
      <Visual alt="alt text" src="folder/image.jpg" title="title" />
    );

    const img = container.querySelector("img") as HTMLImageElement;
    expect(img).not.toBeNull();

    // trigger load event
    fireEvent(img, new Event("load"));
    expect(img).toHaveStyleRule("border", "1px solid #767676");
    expect(img).toHaveStyleRule("padding", "0");
  });

  it("renders correctly with on error", () => {
    const { container } = render(
      <Visual alt="alt text" src="folder/image.jpg" title="title" />
    );

    const img = container.querySelector("img") as HTMLImageElement;
    expect(img).not.toBeNull();

    // trigger error event
    fireEvent(img, new Event("error"));
    expect(captureException).toHaveBeenCalledWith("folder/image.jpg not found");
    expect(img).toHaveStyleRule("padding", "33px");
  });
});
