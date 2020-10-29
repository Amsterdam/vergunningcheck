import "jest-styled-components";

import { ascDefaultTheme, themeSpacing } from "@amsterdam/asc-ui";
import React from "react";

import { QUESTION_ALERT } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import { QuestionAlert } from ".";

const textVariant1 = "Door dit antwoord hebt u een vergunning nodig";
const textVariant2 =
  "Door dit antwoord kunnen we niet vaststellen of u een vergunning nodig hebt.";

describe("QuestionAlert", () => {
  it("renders variant 1 correctly", () => {
    render(<QuestionAlert />);

    const variant1 = screen.queryByText(textVariant1, { exact: false });
    expect(variant1).toBeInTheDocument();

    const variant2 = screen.queryByText(textVariant2, { exact: false });
    expect(variant2).not.toBeInTheDocument();

    const component = screen.queryByTestId(QUESTION_ALERT);
    expect(component).toHaveStyleRule(
      "margin-bottom",
      themeSpacing(6)({ theme: ascDefaultTheme })
    );
  });
  it("renders variant 2 correctly", () => {
    render(<QuestionAlert marginBottom={1} questionNeedsContactExit />);

    const variant1 = screen.queryByText(textVariant1, { exact: false });
    expect(variant1).not.toBeInTheDocument();

    const variant2 = screen.queryByText(textVariant2, { exact: false });
    expect(variant2).toBeInTheDocument();

    const component = screen.queryByTestId(QUESTION_ALERT);
    expect(component).toHaveStyleRule("margin-bottom", "1px");
  });
});
