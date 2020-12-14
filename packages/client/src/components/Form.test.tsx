import React from "react";

import { fireEvent, render, screen } from "../utils/test-utils";
import Form from "./Form";

const onSubmitMock = jest.fn();

it("Form renders correctly without onSubmit", () => {
  const { container } = render(<Form>children</Form>);
  const form = container.querySelector("form") as HTMLElement;

  expect(form).toBeInTheDocument();
  expect(screen.getByText("children")).toBeInTheDocument();

  fireEvent.submit(form);

  expect(onSubmitMock).toBeCalledTimes(0);
});

it("Form renders correctly", () => {
  const { container } = render(<Form onSubmit={onSubmitMock}>children</Form>);
  const form = container.querySelector("form") as HTMLElement;

  expect(form).toBeInTheDocument();
  expect(screen.getByText("children")).toBeInTheDocument();

  fireEvent.submit(form);

  expect(onSubmitMock).toBeCalledTimes(1);
});
