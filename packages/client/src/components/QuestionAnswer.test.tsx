import React from "react";

import { EDIT_BUTTON } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import QuestionAnswer from "./QuestionAnswer";

describe("QuestionAnswer", () => {
  it("QuestionAnswer renders correctly", () => {
    render(<QuestionAnswer showQuestionAlert userAnswer="yes sir" />);

    expect(screen.queryByText("yes sir")).toBeInTheDocument();
    expect(screen.queryByTestId(EDIT_BUTTON)).toBeInTheDocument();
    expect(
      screen.queryByText("Door dit antwoord hebt u een vergunning nodig", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("QuestionAnswer should not render", () => {
    render(<QuestionAnswer showQuestionAlert userAnswer="" />);

    expect(screen.queryByTestId(EDIT_BUTTON)).not.toBeInTheDocument();
    expect(
      screen.queryByText("Door dit antwoord hebt u een vergunning nodig", {
        exact: false,
      })
    ).not.toBeInTheDocument();
  });
});
