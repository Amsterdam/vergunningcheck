import React from "react";

import { QUESTION_ANSWERS } from "../utils/test-ids";
import { act, fireEvent, render } from "../utils/test-utils";
import Answers from "./Answers";
import { booleanOptions } from "./Question";

const onChangeMock = jest.fn();

const mockProps = {
  answers: booleanOptions,
  errors: {
    "uitv__ef6f95f6-bd48-498c-9b19-52d20d8ba364": {
      message: "Error message",
    },
  },
  questionId: "uitv__ef6f95f6-bd48-498c-9b19-52d20d8ba364",
  onChange: onChangeMock,
  userAnswer: "",
};

it("Answers should render", () => {
  const { getByTestId } = render(<Answers {...mockProps} />);
  expect(getByTestId(QUESTION_ANSWERS)).toBeInTheDocument();
});

it("Answers should render the error message", () => {
  const { getByText } = render(<Answers {...mockProps} />);
  expect(getByText("Error message")).toBeInTheDocument();
});

it("Answers should handle the onChange", () => {
  const { getByLabelText } = render(<Answers {...mockProps} />);
  act(() => {
    fireEvent.click(getByLabelText("Ja"));
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
