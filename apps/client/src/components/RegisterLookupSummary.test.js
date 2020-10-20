import React from "react";

import addressMock from "../__mocks__/addressMock";
import addressMockNoMonument from "../__mocks__/addressMockNoMonument";
import addressMockNoRestrictions from "../__mocks__/addressMockNoRestrictions";
import addressMockNoZoningplans from "../__mocks__/addressMockNoZoningplans";
import Context from "../__mocks__/context";
import { findTopicBySlug } from "../utils";
import { render, screen } from "../utils/test-utils";
import RegisterLookupSummary from "./RegisterLookupSummary";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

describe("RegisterLookupSummary", () => {
  const WrapperWithContext = (props) => {
    const setActiveState = jest.fn();
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);

    return (
      <Context addressMock={addressMock} topicMock={topic}>
        <RegisterLookupSummary {...props} setActiveState={setActiveState} />
      </Context>
    );
  };

  it("renders in STTR Flow on LocationFinder (with all restrictions)", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    render(<WrapperWithContext isBelowInputFields showTitle topic={topic} />);

    // Expext to find:
    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

    // Expect NOT to find:
    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("renders in STTR Flow on LocationFinder (with selected restrictions)", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMockNoMonument}
        isBelowInputFields
        showTitle
        topic={topic}
      />
    );

    // Expext to find:
    expect(
      screen.queryByText(
        "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "has MUNICIPAL cityscape"

    // Expect NOT to find:
    expect(
      screen.queryByText("Het gebouw is geen monument.")
    ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "no monument"

    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"

    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("renders in STTR Flow on LocationFinder (without any restrictions)", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMockNoRestrictions}
        isBelowInputFields
        showTitle
        topic={topic}
      />
    );

    // Expect NOT to find:
    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Het gebouw is geen monument.")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("stads- of dorpsgezicht.", { exact: false })
    ).not.toBeInTheDocument();

    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("renders in STTR Flow above the questionnaire (with all restrictions)", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    render(<WrapperWithContext showEditLocationModal topic={topic} />);

    // Expext to find:
    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

    expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();

    // Expect NOT to find:
    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("renders in STTR Flow above the questionnaire (with selected restrictions)", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMockNoMonument}
        showEditLocationModal
        topic={topic}
      />
    );

    // Expext to find:
    expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "has MUNICIPAL cityscape"

    // Expect NOT to find:
    expect(
      screen.queryByText("Het gebouw is geen monument.")
    ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "no monument"

    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"

    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).not.toBeInTheDocument(); // Beware: it should NOT find the result: "a monument"

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("renders in STTR Flow above the questionnaire (without any restrictions)", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMockNoRestrictions}
        showEditLocationModal
        topic={topic}
      />
    );

    // Expext to find:
    expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();

    // Expect NOT to find:
    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Het gebouw is geen monument.")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("stads- of dorpsgezicht.", { exact: false })
    ).not.toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  /**
   *
   * OLO FLOW START HERE:
   *
   */

  it("renders in OLO Flow on LocationFinder (with all restrictions)", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMock}
        isBelowInputFields
        showTitle
        topic={topic}
      />
    );

    // Expext to find:
    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

    // Expect NOT to find:
    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("renders in OLO Flow on LocationFinder (without any restrictions)", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMockNoRestrictions}
        isBelowInputFields
        showTitle
        topic={topic}
      />
    );

    // Expect to find:
    expect(
      screen.queryByText("Het gebouw is geen monument.")
    ).toBeInTheDocument(); // Beware: it should find the result: "no monument"

    expect(
      screen.queryByText(
        "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "no cityscape"

    // Expect NOT to find:
    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("renders in OLO Flow on the Results Page (with all restrictions)", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMock}
        showTitle
        topic={topic}
      />
    );

    // Expext to find:
    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "has NATIONAL cityscape"

    expect(screen.queryByText("zoningplan")).toBeInTheDocument();

    // Expect NOT to find:
    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
  });

  it("renders in OLO Flow on the Results Page (without any restrictions)", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMockNoRestrictions}
        showTitle
        topic={topic}
      />
    );

    // Expext to find:
    expect(screen.queryByText("zoningplan")).toBeInTheDocument();

    expect(
      screen.queryByText("Het gebouw is geen monument.")
    ).toBeInTheDocument(); // Beware: it should find the result: "no monument"

    expect(
      screen.queryByText(
        "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht.",
        { exact: false }
      )
    ).toBeInTheDocument(); // Beware: it should find the result: "no cityscape"

    // Expect NOT to find:
    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();

    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).not.toBeInTheDocument();
  });

  it("renders in OLO Flow on the Results Page (without any zoningplans)", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    render(
      <WrapperWithContext
        addressFromLocation={addressMockNoZoningplans}
        showTitle
        topic={topic}
      />
    );

    // Expect NOT to find:
    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();
  });
});
