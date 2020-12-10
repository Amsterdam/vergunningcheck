import "jest-styled-components";

import React from "react";

// import matchMedia from "../__mocks__/matchMedia";
import { render } from "../utils/test-utils";
import ContactSentence from "./ContactSentence";

// Object.defineProperty(window, "matchMedia", matchMedia);

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useParams: () => ({}),
// }));

it("ContactSentence renders correctly without the `link` prop", () => {
  const { container, queryByText } = render(
    <ContactSentence eventName="testing" link={false} />
  );

  // Default texts
  // `exact: false`, because otherwise it expects nested elements as well (eg: `text <p>text</p>`)
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
