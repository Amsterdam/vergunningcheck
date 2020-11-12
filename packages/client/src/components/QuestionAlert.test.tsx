import "jest-styled-components";

import { ascDefaultTheme, themeSpacing } from "@amsterdam/asc-ui";
import { clientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import { QUESTION_ALERT } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import QuestionAlert from "./QuestionAlert";

const needPermitText = "Door dit antwoord hebt u een vergunning nodig.";
const needContactText =
  "Door dit antwoord kunnen we niet vaststellen of u een vergunning nodig hebt.";

// @TODO: get this text from i18n

describe("QuestionAlert", () => {
  it("renders NEED_PERMIT variant correctly", () => {
    render(<QuestionAlert outcomeType={clientOutcomes.NEED_PERMIT} />);

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
        outcomeType={clientOutcomes.NEED_CONTACT}
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
