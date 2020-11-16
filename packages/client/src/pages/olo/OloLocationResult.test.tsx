import "@testing-library/jest-dom/extend-expect";

import React from "react";

import mockAddress from "../../__mocks__/addressMock";
import { actions, eventNames, sections } from "../../config/matomo";
import { NEXT_BUTTON } from "../../utils/test-ids";
import {
  fireEvent,
  mockMatomoTrackEvent,
  render,
  screen,
} from "../../utils/test-utils";
import OloLocationResult from "./OloLocationResult";

jest.mock("../../hooks/useTopicData", () => () => ({
  topicData: { address: mockAddress },
}));

describe("OloLocationResult", () => {
  it("should render correctly", () => {
    render(<OloLocationResult />);

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

    expect(screen.getByText("Vorige")).toBeInTheDocument();
  });

  it("should handle next button", () => {
    render(<OloLocationResult />);

    const nextButton = screen.queryByTestId(NEXT_BUTTON) as HTMLElement;
    expect(nextButton).toHaveTextContent(/naar het omgevingsloket/i);

    fireEvent.click(nextButton);

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.TO_OLO,
    });
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it("should handle prev button", () => {
    mockMatomoTrackEvent.mockReset();

    render(<OloLocationResult />);

    const prevButton = screen.getByText("Vorige");
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.LOCATION_INPUT}`,
    });
  });
});
