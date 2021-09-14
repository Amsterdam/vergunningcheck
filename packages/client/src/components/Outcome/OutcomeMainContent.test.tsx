import React from "react";

import text from "../../i18n/nl";
import { OUTCOME_MAIN_CONTENT_BUTTON } from "../../utils/test-ids";
import { render, screen } from "../../utils/test-utils";
import OutcomeMainContent from "./OutcomeMainContent";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakraam-plaatsen" }),
}));

describe("OutcomeMainContent", () => {
  it("renders the 'needs permit' outcome correctly", () => {
    render(<OutcomeMainContent />);

    expect(
      screen.queryByTestId(OUTCOME_MAIN_CONTENT_BUTTON)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        text.translation.outcome.needPermit[
          "on this page you can read more how to apply"
        ]
      )
    ).toBeInTheDocument();
  });

  it("doens't render", () => {
    render(<OutcomeMainContent contentText="" />);

    expect(
      screen.queryByTestId(OUTCOME_MAIN_CONTENT_BUTTON)
    ).not.toBeInTheDocument();
  });
});
