import React from "react";

import {
  MODAL,
  MODAL_CLOSE_BUTTON,
  MODAL_DECLINE_BUTTON,
  MODAL_OPEN_BUTTON,
} from "../utils/test-ids";
import { act, fireEvent, render } from "../utils/test-utils";
import Modal from "./Modal";

window.scrollTo = jest.fn();

const onOpenMock = jest.fn();

it("Modal Button should render, but the Modal itself not", () => {
  const { getByText, queryByTestId } = render(
    <Modal openButtonText="button">text</Modal>
  );
  expect(getByText("button")).toBeInTheDocument();
  expect(queryByTestId(MODAL_OPEN_BUTTON)).toBeInTheDocument();

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
});

it("Modal should open and close", async () => {
  const { getByText, queryByTestId } = render(
    <Modal
      backdropOpacity={20}
      openButtonText="button"
      heading="heading"
      handleOpenModal={onOpenMock}
    >
      text
    </Modal>
  );

  // Modal = open
  act(() => {
    fireEvent.click(getByText("button"));
  });

  expect(queryByTestId(MODAL)).toBeInTheDocument();
  expect(getByText("heading")).toBeInTheDocument();
  expect(onOpenMock).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.click(queryByTestId(MODAL_CLOSE_BUTTON));
  });
  // Modal = closed

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();

  act(() => {
    fireEvent.click(getByText("button"));
  });
  // Modal = open

  expect(queryByTestId(MODAL)).toBeInTheDocument();
  expect(onOpenMock).toHaveBeenCalledTimes(2);

  act(() => {
    fireEvent.click(queryByTestId(MODAL_DECLINE_BUTTON));
  });
  // Modal = closed

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
});
