import React from "react";

import { cleanup, render } from "../utils/test-utils";
import QuestionAnswer from "./QuestionAnswer";

afterEach(cleanup);

it("QuestionAnswer renders correctly", () => {
  const { queryByText } = render(
    <QuestionAnswer showConclusionAlert userAnswer="yes sir" />
  );

  expect(queryByText("yes sir")).toBeInTheDocument();
  expect(
    queryByText("Door dit antwoord hebt u een vergunning nodig", {
      exact: false,
    })
  ).toBeInTheDocument();
});
