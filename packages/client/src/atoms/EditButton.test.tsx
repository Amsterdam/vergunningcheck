import "jest-styled-components";

import React from "react";

import nl from "../i18n/nl";
import { EDIT_BUTTON } from "../utils/test-ids";
import { act, fireEvent, render, screen } from "../utils/test-utils";
import { EditButton } from ".";

const onClickMock = jest.fn();

describe("EditButton", () => {
  it("renders correctly", () => {
    render(<EditButton onClick={onClickMock} />);

    expect(screen.queryByTestId(EDIT_BUTTON)).toBeInTheDocument();
    expect(screen.queryByText(nl.translation.common.edit)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId(EDIT_BUTTON));
    });

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
