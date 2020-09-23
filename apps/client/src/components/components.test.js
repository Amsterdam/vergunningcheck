import "jest-styled-components";

import React from "react";

import matchMedia from "../__mocks__/matchMedia";
import { EDIT_BUTTON } from "../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../utils/test-utils";
import AddressLine from "./AddressLine";
import ContactSentence from "./ContactSentence";
import PrintDetails from "./PrintDetails";
import QuestionAnswer from "./QuestionAnswer";
import RegisterLookupSummary from "./RegisterLookupSummary";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

let onClickMock;

afterEach(() => {
  onClickMock = jest.fn();

  cleanup();
});

// These tests are meant to test only the most basic components. Advanced components need their own file.

const addressMock = {
  houseNumberFull: "123",
  restrictions: [
    {
      __typename: "Monument",
      name: "monument",
    },
    {
      __typename: "CityScape",
      name: "cityscape",
    },
  ],
  streetName: "streetname",
  zoningPlans: [
    {
      name: "zoningplan",
    },
  ],
};

it("AddressLine renders correctly with the `strong` prop", () => {
  const { container, queryByText } = render(
    <AddressLine address={addressMock} strong />
  );

  expect(queryByText("streetname 123")).toBeInTheDocument();
  expect(container.querySelector("strong")).toBeInTheDocument();
});

it("AddressLine renders correctly without the `strong` prop", () => {
  const { container, queryByText } = render(
    <AddressLine address={addressMock} />
  );

  expect(queryByText("streetname 123")).toBeInTheDocument();
  expect(container.querySelector("strong")).not.toBeInTheDocument();
});

it("ContactSentence renders correctly without the `link` prop", () => {
  const { container, queryByText } = render(<ContactSentence link={false} />);

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
  const { container } = render(<ContactSentence />);
  expect(container.querySelector("a")).toBeInTheDocument();
});

it("PrintDetails renders correctly", () => {
  const { queryByText } = render(<PrintDetails />);

  expect(queryByText("Pagina")).toBeInTheDocument();
  expect(queryByText("Datum")).toBeInTheDocument();
});

it("QuestionAnswer renders correctly", () => {
  const { queryByText } = render(
    <QuestionAnswer
      onClick={onClickMock}
      showConclusionAlert
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

it("RegisterLookupSummary renders correctly", () => {
  const matomoTrackEvent = jest.fn();
  const setActiveState = jest.fn();

  const { queryByTestId, queryByText } = render(
    <RegisterLookupSummary
      address={addressMock}
      displayZoningPlans
      matomoTrackEvent={matomoTrackEvent}
      setActiveState={setActiveState}
      topic={{}}
    />
  );

  expect(queryByText("Monument:")).toBeInTheDocument();
  expect(queryByText("Het gebouw is een monument.")).toBeInTheDocument();
  expect(
    queryByText("Het gebouw ligt in een beschermd stads- of dorpsgezicht.")
  ).toBeInTheDocument();
  expect(queryByText("zoningplan")).toBeInTheDocument();

  expect(queryByTestId(EDIT_BUTTON)).toBeInTheDocument();

  act(() => {
    fireEvent.click(queryByTestId(EDIT_BUTTON));
  });

  expect(matomoTrackEvent).toBeCalledTimes(1);

  // @TODO: finish this test when we work on the Location Component
  // Lines to test: 39,61,69,70,80
});
