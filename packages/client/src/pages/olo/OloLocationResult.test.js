import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressMock from "../../__mocks__/addressMock";
import Context from "../../__mocks__/context";
import matchMedia from "../../__mocks__/matchMedia";
import { actions, eventNames, sections } from "../../config/matomo";
import { findTopicBySlug } from "../../utils";
import { fireEvent, render, screen } from "../../utils/test-utils";
import OloLocationResult from "./OloLocationResult";

Object.defineProperty(window, "matchMedia", matchMedia);

window.open = jest.fn();
window.scrollTo = jest.fn();

const matomoTrackEvent = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    location: {
      pathname: "/aanbouw-of-uitbouw-maken/adresgegevens",
    },
    push: jest.fn(),
  }),
  useLocation: () => jest.fn(),
  useParams: () => ({ slug: "aanbouw-of-uitbouw-maken" }),
}));

describe("OloLocationResult", () => {
  const topic = findTopicBySlug("aanbouw-of-uitbouw-maken");

  const Wrapper = () => {
    return (
      <Context addressMock={addressMock} topicMock={topic}>
        <OloLocationResult matomoTrackEvent={matomoTrackEvent} topic={topic} />
      </Context>
    );
  };

  it("should render correctly", () => {
    render(<Wrapper />);

    expect(screen.queryByText("Adresgegevens")).toBeInTheDocument();
    expect(screen.queryByText("streetname 123")).toBeInTheDocument();
    expect(screen.queryByText("1234 AB Amsterdam")).toBeInTheDocument();
    expect(
      screen.queryByText("Het gebouw is een monument.")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Het gebouw ligt in een rijksbeschermd stads- of dorpsgezicht."
      )
    ).toBeInTheDocument();
    // Expect to find zoningplan info
    expect(screen.queryByText("zoningplan")).toBeInTheDocument();

    expect(screen.getByText("Vorige")).toBeInTheDocument();
  });

  it("should handle next button", () => {
    render(<Wrapper />);

    const nextButton = screen.getByText("Naar het omgevingsloket");
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(matomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.TO_OLO,
    });
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it("should handle prev button", () => {
    matomoTrackEvent.mockReset();

    render(<Wrapper />);

    const prevButton = screen.getByText("Vorige");
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(matomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.LOCATION_INPUT}`,
    });
  });
});
