import "jest-styled-components";

import React from "react";

import { EDIT_BUTTON, TEXT_TO_EDIT_BUTTON } from "../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../utils/test-utils";
import {
  Alert,
  ComponentWrapper,
  EditButton,
  List,
  PrintOnly,
  TextToEdit,
} from ".";

let onClickMock;

afterEach(() => {
  onClickMock = jest.fn();

  cleanup();
});

it("Alert renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <Alert content="content" data-testid="component" heading="heading">
      children
    </Alert>
  );
  expect(queryByTestId("component")).toBeInTheDocument();
  expect(queryByText("heading")).toBeInTheDocument();
  expect(queryByText("content")).toBeInTheDocument();
  expect(queryByText("children")).toBeInTheDocument();
});

it("ComponentWrapper renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <ComponentWrapper data-testid="component" marginBottom={100}>
      content
    </ComponentWrapper>
  );

  expect(queryByText("content")).toBeInTheDocument();
  expect(queryByTestId("component")).toBeInTheDocument();
  expect(queryByTestId("component")).toHaveStyleRule("margin-bottom", "100px");
});

it("EditButton renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <EditButton onClick={onClickMock} />
  );

  expect(queryByTestId(EDIT_BUTTON)).toBeInTheDocument();
  expect(queryByText("Wijzig")).toBeInTheDocument();

  act(() => {
    fireEvent.click(queryByTestId(EDIT_BUTTON));
  });

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it("List renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <List data-testid="component" onClick={onClickMock}>
      content
    </List>
  );

  expect(queryByTestId("component")).toBeInTheDocument();
  expect(queryByText("content")).toBeInTheDocument();

  act(() => {
    fireEvent.click(queryByTestId("component"));
  });

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it("PrintOnly renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <PrintOnly
      data-testid="component"
      onClick={onClickMock}
      avoidPageBreak
      withBorder
    >
      content
    </PrintOnly>
  );

  expect(queryByTestId("component")).toBeInTheDocument();
  expect(queryByText("content")).toBeInTheDocument();

  act(() => {
    fireEvent.click(queryByTestId("component"));
  });

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

it("TextToEdit renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <TextToEdit onClick={onClickMock}>content</TextToEdit>
  );

  expect(queryByTestId(TEXT_TO_EDIT_BUTTON)).toBeInTheDocument();
  expect(queryByText("content")).toBeInTheDocument();
});
