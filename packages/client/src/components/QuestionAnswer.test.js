import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import { render } from "../utils/test-utils";
import QuestionAnswer from "./QuestionAnswer";

it("QuestionAnswer renders correctly", () => {
  const { queryByText } = render(
    <QuestionAnswer
      outcomeType={ClientOutcomes.NEED_PERMIT}
      showQuestionAlert
      userAnswer="yes sir"
    />
  );

  expect(queryByText("yes sir")).toBeInTheDocument();
  expect(
    queryByText("Door dit antwoord hebt u een vergunning nodig", {
      exact: false,
    })
  ).toBeInTheDocument();
});
