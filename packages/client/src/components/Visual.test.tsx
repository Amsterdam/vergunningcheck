import "jest-styled-components";

import React from "react";

import { FIGCAPTION, FIGURE, IMG } from "../utils/test-ids";
import { fireEvent, render, screen } from "../utils/test-utils";
import Visual from "./Visual";

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

  it("renders correctly with on error", () => {
    const { container } = render(
      <Visual alt="alt text" src="folder/image.jpg" title="title" />
    );

    expect(screen.queryByAltText("alt text")).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByTestId(FIGCAPTION)).toBeInTheDocument();

    let img = container.querySelector("img");
    expect(img).not.toBeNull();
    if (img) {
      fireEvent(img, new Event("error"));
      expect(img).toHaveStyleRule("border", "1px solid #767676");
    }
  });

  it("renders correctly with on load", () => {
    const { container } = render(
      <Visual alt="alt text" src="folder/image.jpg" title="title" />
    );

    expect(screen.queryByAltText("alt text")).toBeInTheDocument();
    expect(screen.queryByText("title")).toBeInTheDocument();
    expect(screen.queryByTestId(FIGCAPTION)).toBeInTheDocument();

    let img = container.querySelector("img");
    expect(img).not.toBeNull();
    if (img) {
      fireEvent(img, new Event("load"));
      expect(img).toHaveStyleRule("border", "1px solid #767676");
    }
  });
});
