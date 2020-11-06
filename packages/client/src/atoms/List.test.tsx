import React from "react";

import { act, fireEvent, render } from "../utils/test-utils";
import { List } from ".";

const onClickMock = jest.fn();

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
