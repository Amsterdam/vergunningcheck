import React from "react";

import { booleanQuestion, booleanQuestionError } from "../__mocks__/question";
import { QUESTION_ANSWERS } from "../utils/test-ids";
import { act, fireEvent, render, screen } from "../utils/test-utils";
import Answers from "./Answers";

const onChangeMock = jest.fn();

const mockProps = {
  errors: {},
  question: booleanQuestion,
  saveAnswer: onChangeMock,
};

it("Answers should render", () => {
  render(<Answers {...mockProps} />);
  expect(screen.getByTestId(QUESTION_ANSWERS)).toBeInTheDocument();

  // Don't find the error
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

it("Answers should render the error message", () => {
  render(<Answers {...mockProps} errors={booleanQuestionError} />);

  expect(screen.queryByRole("alert")).toBeInTheDocument();
  expect(
    screen.getByText(booleanQuestionError[booleanQuestion.id].message)
  ).toBeInTheDocument();
});

it("Answers should handle the onChange", () => {
  render(<Answers {...mockProps} />);
  act(() => {
    fireEvent.click(screen.getByLabelText("Ja"));
  });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
