import React from "react";

import addressMock from "../__mocks__/addressMock";
import addressMockNoCityScape from "../__mocks__/addressMockNoCityScape";
import addressMockNoMonument from "../__mocks__/addressMockNoMonument";
import Context from "../__mocks__/context";
import matchMedia from "../__mocks__/matchMedia";
import { findTopicBySlug } from "../utils";
import { act, cleanup, fireEvent, render, screen } from "../utils/test-utils";
import RegisterLookupSummary from "./RegisterLookupSummary";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

afterEach(cleanup);

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

  it("renders correctly in STTR Flow if monument and national cityScape", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    const { queryByText } = render(<WrapperWithContext topic={topic} />);

    expect(queryByText("Het gebouw is een monument.")).toBeInTheDocument();
    expect(
      queryByText(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht."
      )
    ).toBeInTheDocument();

    // Expect NOT to find zoningplan info
    expect(queryByText("zoningplan")).not.toBeInTheDocument();
    expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.queryByText(/wijzig/i));
    });
  });

  it("renders correctly in STTR Flow if no cityScape", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    const { queryByText } = render(
      <WrapperWithContext
        addressFromLocation={addressMockNoCityScape}
        topic={topic}
      />
    );

    expect(
      queryByText("beschermd stads- of dorpsgezicht.")
    ).not.toBeInTheDocument();
  });

  it("renders correctly in STTR Flow if NOT a monument and municipal cityScape", () => {
    const topicMock = "dakraam-plaatsen";
    const topic = findTopicBySlug(topicMock);
    const { queryByText } = render(
      <WrapperWithContext
        addressFromLocation={addressMockNoMonument}
        topic={topic}
      />
    );

    expect(queryByText("Het gebouw is een monument.")).not.toBeInTheDocument();
    expect(
      queryByText(
        "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht."
      )
    ).toBeInTheDocument();

    // Expect NOT to find zoningplan info
    expect(queryByText("zoningplan")).not.toBeInTheDocument();

    expect(screen.queryByText(/wijzig/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.queryByText(/wijzig/i));
    });
  });

  it("renders correctly in OLO Flow if no cityScape", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    const { queryByText } = render(
      <WrapperWithContext
        addressFromLocation={addressMockNoCityScape}
        topic={topic}
      />
    );

    expect(
      queryByText(
        "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht."
      )
    ).toBeInTheDocument();
  });

  it("renders correctly in OLO Flow if building is a monument and national cityScape", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    const { queryByText } = render(
      <WrapperWithContext addressFromLocation={addressMock} topic={topic} />
    );

    expect(queryByText("Het gebouw is een monument.")).toBeInTheDocument();
    expect(
      queryByText(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht."
      )
    ).toBeInTheDocument();

    // Expect to find zoningplan info
    expect(queryByText("zoningplan")).toBeInTheDocument();

    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
  });

  it("renders correctly in OLO Flow if building is NOT a monument and a MUNICIPAL cityScape", () => {
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);
    const { queryByText } = render(
      <WrapperWithContext
        addressFromLocation={addressMockNoMonument}
        topic={topic}
      />
    );
    expect(queryByText("Het gebouw is geen monument.")).toBeInTheDocument();
    expect(
      queryByText(
        "Het gebouw ligt in een gemeentelijk beschermd stads- of dorpsgezicht."
      )
    ).toBeInTheDocument();

    // Expect to find zoningplan info
    expect(queryByText("zoningplan")).toBeInTheDocument();

    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
  });

  it("renders correctly in address from location object", () => {
    const setActiveState = jest.fn();
    const topicMock = "aanbouw-of-uitbouw-maken";
    const topic = findTopicBySlug(topicMock);

    const { queryByText } = render(
      <RegisterLookupSummary
        addressFromLocation={addressMock}
        setActiveState={setActiveState}
        topic={topic}
      />
    );

    // Expect TO DO find zoningplan info
    expect(queryByText("zoningplan")).toBeInTheDocument();

    expect(screen.queryByText(/wijzig/i)).not.toBeInTheDocument();
  });

  // @TODO: finish this test when we work on the Location Component
});
