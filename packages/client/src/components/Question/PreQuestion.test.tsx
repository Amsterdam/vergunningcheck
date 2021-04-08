import React from "react";

import nl from "../../i18n/nl";
import { act, fireEvent, render, screen } from "../../utils/test-utils";
import PreQuestion from "./PreQuestion";

const editQuestion = jest.fn();
const goToNextQuestion = jest.fn();
const isCheckerConclusive = jest.fn();
const saveAnswer = jest.fn();

const preQuestionFunctions = {
  editQuestion,
  goToNextQuestion,
  isCheckerConclusive,
  saveAnswer,
};

describe("PreQuestion", () => {
  it("handles submit", async () => {
    render(
      <PreQuestion
        answer={true}
        questionId="question-1"
        {...preQuestionFunctions}
      />
    );

    expect(screen.getByRole("form")).toBeInTheDocument();

    expect(
      screen.getByLabelText(nl.translation.common.yes)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(nl.translation.common.yes)).toBeChecked();

    await act(async () => {
      // Submit the form
      fireEvent.submit(screen.getByRole("form"));
    });

    act(() => {
      // This callback is called by a "react-hook-form" hook and needs to wrapped in an `act`
      expect(goToNextQuestion).toBeCalled();
    });
  });

  it("handles props and onClick", async () => {
    render(
      <PreQuestion
        description="mock description"
        questionId="question-2"
        questionAlertText="mock questionAlertText"
        {...preQuestionFunctions}
        isCheckerConclusive={() => true}
      />
    );

    // Renders props
    expect(screen.getByText("mock description")).toBeInTheDocument();
    expect(screen.getByText("mock questionAlertText")).toBeInTheDocument();
    expect(
      screen.getByText(nl.translation.outcome.goToOutcome)
    ).toBeInTheDocument();

    // Handles onClick
    expect(screen.getByLabelText(nl.translation.common.yes)).not.toBeChecked();
    act(() => {
      fireEvent.click(screen.getByTestId(`question-2-a1`));
    });
    expect(screen.getByLabelText(nl.translation.common.yes)).toBeChecked();
    expect(saveAnswer).toBeCalled();
  });
});
