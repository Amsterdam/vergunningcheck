import "jest-styled-components";

import React from "react";

import { act, cleanup, fireEvent, render } from "../utils/test-utils";
import { PrintOnly } from ".";

const onClickMock = jest.fn();

afterEach(cleanup);

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
