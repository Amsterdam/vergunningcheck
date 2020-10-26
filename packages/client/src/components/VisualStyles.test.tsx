import "jest-styled-components";

import React from "react";

import { FIGCAPTION, FIGURE, IMG } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import { Figure, Img } from "./VisualStyles";

it("Figure renders correctly without props", () => {
  render(<Figure data-testid={FIGURE} />);

  expect(screen.queryByTestId(FIGURE)).toBeInTheDocument();
  expect(screen.queryByTestId(FIGURE)).toHaveStyleRule("height", "0");

  expect(screen.queryByTestId(IMG)).not.toBeInTheDocument();
  expect(screen.queryByTestId(FIGCAPTION)).not.toBeInTheDocument();
});

it("Figure renders correctly with props", () => {
  render(<Figure data-testid={FIGURE} errored loaded />);

  expect(screen.queryByTestId(FIGURE)).toBeInTheDocument();
  expect(screen.queryByTestId(FIGURE)).not.toHaveStyleRule("height", "0");
  expect(screen.queryByTestId(FIGURE)).toHaveStyleRule("min-height", "1px");

  expect(screen.queryByTestId(IMG)).not.toBeInTheDocument();
  expect(screen.queryByTestId(FIGCAPTION)).not.toBeInTheDocument();
});

it("Img renders shouldn't render", () => {
  render(<Img data-testid={IMG} />);

  expect(screen.queryByTestId(IMG)).toBeInTheDocument();
  expect(screen.queryByTestId(IMG)).toHaveStyleRule(
    "border",
    "1px solid transparent"
  );

  expect(screen.queryByTestId(IMG)).not.toHaveAttribute("src");
  expect(screen.queryByTestId(FIGURE)).not.toBeInTheDocument();
  expect(screen.queryByTestId(FIGCAPTION)).not.toBeInTheDocument();
});

it("Img renders correctly with props", () => {
  render(<Img data-testid={IMG} errored loaded src="folder/image.jpg" />);

  expect(screen.queryByTestId(IMG)).toBeInTheDocument();
  expect(screen.queryByTestId(IMG)).toHaveAttribute("src");
  expect(screen.queryByTestId(IMG)).toHaveStyleRule(
    "border",
    "1px solid #767676"
  );

  expect(screen.queryByTestId(FIGURE)).not.toBeInTheDocument();
  expect(screen.queryByTestId(FIGCAPTION)).not.toBeInTheDocument();
});
