import "jest-styled-components";

import React from "react";

import { render } from "../utils/test-utils";
import ContactSentence from "./ContactSentence";

it("ContactSentence renders correctly without the `link` prop", () => {
  const { container, queryByText } = render(
    <ContactSentence eventName="testing" link={false} />
  );

  // Default texts
  expect(
    queryByText("Bel in een van deze situaties de gemeente op", {
      exact: false,
    })
  ).toBeInTheDocument();

  expect(queryByText("14 020", { exact: false })).toBeInTheDocument();
  expect(
    queryByText("maandag tot en met vrijdag", { exact: false })
  ).toBeInTheDocument();

  expect(container.querySelector("a")).not.toBeInTheDocument();
});

it("ContactSentence renders correctly with the `link` prop", () => {
  const { container } = render(<ContactSentence eventName="testing" />);
  expect(container.querySelector("a")).toBeInTheDocument();
});
