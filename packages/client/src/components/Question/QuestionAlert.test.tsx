import "jest-styled-components";

import { ascDefaultTheme, themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import text from "../../i18n/nl";
import { QUESTION_ALERT } from "../../utils/test-ids";
import { render, screen } from "../../utils/test-utils";
import { QuestionAlert } from "./";

const needPermitText =
  text.translation.question.alert["this answer causes a need for permit"];
const needContactText =
  text.translation.question.alert[
    "this anwser makes it unable to determine the outcome"
  ];

describe("QuestionAlert", () => {
  it("renders NEED_PERMIT variant correctly", () => {
    render(<QuestionAlert outcomeType={ClientOutcomes.NEED_PERMIT} />);

    const variant1 = screen.queryByText(needPermitText, { exact: false });
    expect(variant1).toBeInTheDocument();

    const variant2 = screen.queryByText(needContactText, { exact: false });
    expect(variant2).not.toBeInTheDocument();

    const component = screen.queryByTestId(QUESTION_ALERT);
    expect(component).toHaveStyleRule(
      "margin-bottom",
      themeSpacing(6)({ theme: ascDefaultTheme })
    );
  });
  it("renders NEED_CONTACT variant correctly", () => {
    render(
      <QuestionAlert
        marginBottom={1}
        outcomeType={ClientOutcomes.NEED_CONTACT}
      />
    );

    const variant1 = screen.queryByText(needPermitText, { exact: false });
    expect(variant1).not.toBeInTheDocument();

    const variant2 = screen.queryByText(needContactText, { exact: false });
    expect(variant2).toBeInTheDocument();

    const component = screen.queryByTestId(QUESTION_ALERT);
    expect(component).toHaveStyleRule("margin-bottom", "1px");
  });
});
