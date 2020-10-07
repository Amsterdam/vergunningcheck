import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressMock from "../../__mocks__/addressMock";
import Context from "../../__mocks__/context";
import { actions, eventNames, sections } from "../../config/matomo";
import { findTopicBySlug } from "../../utils";
import { cleanup, fireEvent, render } from "../../utils/test-utils";
import LocationResult from "./LocationResult";

const matomoTrackEvent = jest.fn();
const setActiveState = jest.fn();
window.open = jest.fn();

const mockedFunctions = { ...{ matomoTrackEvent, setActiveState } };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ slug: "aanbouw-of-uitbouw-maken" }),
}));

afterEach(cleanup);

describe("LocationResult", () => {
  const WrapperWithContext = (props) => {
    return (
      <Context topicMock={props.topic} addressMock={addressMock}>
        <LocationResult topic={props.topic} {...props} {...mockedFunctions} />
      </Context>
    );
  };

  it("should render correctly on first load without IMTR", () => {
    const topic = findTopicBySlug("aanbouw-of-uitbouw-maken");
    const { queryByText } = render(<WrapperWithContext topic={topic} />);

    expect(queryByText("streetname 123")).toBeInTheDocument();
    expect(queryByText("1234 AB Amsterdam")).toBeInTheDocument();
    expect(queryByText("Het gebouw is een monument.")).toBeInTheDocument();
    expect(
      queryByText("Het gebouw ligt in een beschermd stads- of dorpsgezicht.")
    ).toBeInTheDocument();
    // Expect to find zoningplan info
    expect(queryByText("zoningplan")).toBeInTheDocument();
  });

  it("should render correctly on first load with IMTR", () => {
    const topic = findTopicBySlug("dakraam-plaatsen");
    const { queryByText } = render(<WrapperWithContext topic={topic} />);

    expect(queryByText("streetname 123")).toBeInTheDocument();
    expect(queryByText("1234 AB Amsterdam")).toBeInTheDocument();
    expect(queryByText("Het gebouw is een monument.")).toBeInTheDocument();
    expect(
      queryByText("Het gebouw ligt in een beschermd stads- of dorpsgezicht.")
    ).toBeInTheDocument();
    // Expect to find zoningplan info
    expect(queryByText("zoningplan")).not.toBeInTheDocument();
  });

  it("should handle prev button", () => {
    const topic = findTopicBySlug("aanbouw-of-uitbouw-maken");
    const { getByText } = render(<WrapperWithContext topic={topic} />);

    const prevButton = getByText("Vorige");
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(matomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.LOCATION_INPUT}`,
    });
  });

  it("should handle next button", () => {
    const topic = findTopicBySlug("aanbouw-of-uitbouw-maken");
    const { getByText } = render(<WrapperWithContext topic={topic} />);

    const nextButton = getByText("Naar het omgevingsloket");
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(matomoTrackEvent).toHaveBeenCalledTimes(2);
    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.TO_OLO,
    });
    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
