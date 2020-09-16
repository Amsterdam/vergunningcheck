import React from "react";

import { MODAL, MODAL_BUTTON, MODAL_CLOSE } from "../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../utils/test-utils";
import Modal from "./Modal";

const onClickMock = jest.fn();

afterEach(cleanup);

it("Modal Button should render, but the Modal itself not", () => {
  const { getByText, queryByTestId } = render(
    <Modal buttonText="button">text</Modal>
  );
  expect(getByText("button")).toBeInTheDocument();
  expect(queryByTestId(MODAL_BUTTON)).toBeInTheDocument();

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
});

it("Modal should open and close", () => {
  const { getByText, queryByTestId } = render(
    <Modal buttonText="button" heading="heading" onClick={onClickMock}>
      text
    </Modal>
  );

  act(() => {
    fireEvent.click(getByText("button"));
  });

  expect(queryByTestId(MODAL)).toBeInTheDocument();
  expect(getByText("heading")).toBeInTheDocument();
  expect(onClickMock).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.click(queryByTestId(MODAL_CLOSE));
  });

  expect(queryByTestId(MODAL)).not.toBeInTheDocument();
});
