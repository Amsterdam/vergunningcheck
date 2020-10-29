import React from "react";

import { TEXT_TO_EDIT_BUTTON } from "../utils/test-ids";
import { render } from "../utils/test-utils";
import { TextToEdit } from ".";

const onClickMock = jest.fn();

it("TextToEdit renders correctly", () => {
  const { queryByTestId, queryByText } = render(
    <TextToEdit onClick={onClickMock}>content</TextToEdit>
  );

  expect(queryByTestId(TEXT_TO_EDIT_BUTTON)).toBeInTheDocument();
  expect(queryByText("content")).toBeInTheDocument();
});
