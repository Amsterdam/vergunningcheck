import React from "react";

import {
  MODAL,
  MODAL_CLOSE_BUTTON,
  MODAL_OPEN_BUTTON,
} from "../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../utils/test-utils";
import Modal from "./Modal";

const onOpenMock = jest.fn();
const onConfirmMock = jest.fn();

afterEach(cleanup);

it("Modal Button should render, but the Modal itself not", () => {
  const { getByText, queryByTestId } = render(
    <Modal openButtonText="button">text</Modal>
  );
  expect(getByText("button")).toBeInTheDocument();
  expect(queryByTestId(MODAL_OPEN_BUTTON)).toBeInTheDocument();

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
});

it("Modal should open and close", () => {
  const { getByText, queryByTestId } = render(
    <Modal
      openButtonText="button"
      heading="heading"
      handleOpenModal={onOpenMock}
    >
      text
    </Modal>
  );

  act(() => {
    fireEvent.click(getByText("button"));
  });

  expect(queryByTestId(MODAL)).toBeInTheDocument();
  expect(getByText("heading")).toBeInTheDocument();
  expect(onOpenMock).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.click(queryByTestId(MODAL_CLOSE_BUTTON));
  });

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
});

// @TODO: finish this test
xit("Modal should handle the footer buttons", () => {
  const { getByText, queryByTestId } = render(
    <Modal
      openButtonText="button"
      handleConfirmButton={onConfirmMock}
      showCloseButton
    >
      text
    </Modal>
  );

  act(() => {
    fireEvent.click(getByText("button"));
  });

  expect(queryByTestId(MODAL)).toBeInTheDocument();
  expect(getByText("heading")).toBeInTheDocument();
  expect(onOpenMock).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.click(queryByTestId(MODAL_CLOSE_BUTTON));
  });

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
});

// Lines to check:
// 88,123,124,132
