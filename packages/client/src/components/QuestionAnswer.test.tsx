import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import nl from "../i18n/nl";
import { EDIT_BUTTON } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import QuestionAnswer from "./QuestionAnswer";

const expectPermit =
  nl.translation.question.alert["this answer causes a need for permit"];

describe("QuestionAnswer", () => {
  it("renders correctly with NEED_PERMIT", () => {
    render(
      <QuestionAnswer
        outcomeType={ClientOutcomes.NEED_PERMIT}
        showQuestionAlert
        userAnswer="yes sir"
      />
    );

    expect(screen.queryByText("yes sir")).toBeInTheDocument();
    expect(screen.queryByTestId(EDIT_BUTTON)).toBeInTheDocument();
    expect(screen.queryByText(expectPermit)).toBeInTheDocument();
  });

  it("should not render with PERMIT_FREE", () => {
    render(
      <QuestionAnswer
        outcomeType={ClientOutcomes.PERMIT_FREE}
        showQuestionAlert
        userAnswer="yes sir"
      />
    );

    expect(screen.queryByText("yes sir")).toBeInTheDocument();
    expect(screen.queryByText(expectPermit)).not.toBeInTheDocument();
  });

  it("should not render without userAnswer", () => {
    render(
      <QuestionAnswer
        outcomeType={ClientOutcomes.NEED_PERMIT}
        showQuestionAlert
        userAnswer=""
      />
    );

    expect(screen.queryByTestId(EDIT_BUTTON)).not.toBeInTheDocument();
    expect(screen.queryByText(expectPermit)).not.toBeInTheDocument();
  });
});
