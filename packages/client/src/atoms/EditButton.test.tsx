import "jest-styled-components";

import React from "react";

import { EDIT_BUTTON } from "../utils/test-ids";
import { act, fireEvent, render } from "../utils/test-utils";
import { EditButton } from ".";

const onClickMock = jest.fn();

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
