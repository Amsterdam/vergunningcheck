import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import nl from "../../i18n/nl";
import { EDIT_BUTTON } from "../../utils/test-ids";
import { render, screen } from "../../utils/test-utils";
import { QuestionAnswer } from "./";

const expectPermitText =
  nl.translation.question.alert["this answer causes a need for permit"];

describe("QuestionAnswer", () => {
  it("renders correctly with NEED_PERMIT", () => {
    render(
      <QuestionAnswer
        answer="yes"
        outcomeType={ClientOutcomes.NEED_PERMIT}
        showQuestionAlert
      />
    );

    expect(screen.queryByText("yes")).toBeInTheDocument();
    expect(screen.queryByTestId(EDIT_BUTTON)).toBeInTheDocument();
    expect(screen.queryByText(expectPermitText)).toBeInTheDocument();
  });

  it("should not render with PERMIT_FREE", () => {
    render(
      <QuestionAnswer
        answer="yes"
        outcomeType={ClientOutcomes.PERMIT_FREE}
        showQuestionAlert
      />
    );

    expect(screen.queryByText("yes")).toBeInTheDocument();
    expect(screen.queryByText(expectPermitText)).not.toBeInTheDocument();
  });

  it("should not render without answer", () => {
    render(
      <QuestionAnswer
        answer={undefined}
        outcomeType={ClientOutcomes.NEED_PERMIT}
        showQuestionAlert
      />
    );

    expect(screen.queryByTestId(EDIT_BUTTON)).not.toBeInTheDocument();
    expect(screen.queryByText(expectPermitText)).not.toBeInTheDocument();
  });
});
