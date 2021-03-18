import "jest-styled-components";

import React from "react";

import text from "../i18n/nl";
import { render, screen } from "../utils/test-utils";
import ContactSentence from "./ContactSentence";

it("ContactSentence renders correctly without the `link` prop", () => {
  const { container, queryByText } = render(
    <ContactSentence eventName="testing" link={false} />
  );

  // Default texts
  expect(
    screen.queryByText(
      text.translation.introPage.common["call in this situations"],
      { exact: false }
    )
  ).toBeInTheDocument();

  expect(queryByText("14 020", { exact: false })).toBeInTheDocument();

  expect(container.querySelector("a")).not.toBeInTheDocument();
});

it("ContactSentence renders correctly with the `link` prop", () => {
  const { container } = render(<ContactSentence eventName="testing" />);
  expect(container.querySelector("a")).toBeInTheDocument();
});
