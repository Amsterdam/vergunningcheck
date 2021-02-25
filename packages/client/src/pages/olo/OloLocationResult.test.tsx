import "@testing-library/jest-dom/extend-expect";

import React from "react";

import mockAddress from "../../__mocks__/addressMock";
import { useTopicData } from "../../hooks";
import nl from "../../i18n/nl";
import { defaultTopicSession as mockDefaultTopic } from "../../SessionContext";
import { findTopicBySlug } from "../../utils";
import { NEXT_BUTTON } from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockHistoryPush,
  mockHistoryReplace,
  mockMatomoTrackEvent,
  render,
  screen,
} from "../../utils/test-utils";
import OloLocationResult from "./OloLocationResult";

jest.mock("../../hooks/useTopicData");

const mockTopic = findTopicBySlug("aanbouw-of-uitbouw-maken");
jest.mock("../../hooks/useTopic", () => () => mockTopic);

const { common } = nl.translation;

describe("OloLocationResult", () => {
  it("should render correctly", () => {
    (useTopicData as any).mockReturnValue({
      topicData: { address: mockAddress },
    });

    render(<OloLocationResult />);

    expect(
      screen.queryByText(nl.translation.location.address.heading)
    ).toBeInTheDocument();
    expect(screen.queryByText("streetname 123")).toBeInTheDocument();
    expect(screen.queryByText("1234 AB Amsterdam")).toBeInTheDocument();
    expect(
      screen.queryByText(
        common["the building is a monument"].replace(
          "{{monument}}",
          "gemeentelijk monument"
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        common["the building is located inside a city scape"].replace(
          "{{cityScape}}",
          "rijksbeschermd stads- of dorpsgezicht"
        )
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Vorige")).toBeInTheDocument();
  });

  it("should handle next button", () => {
    mockMatomoTrackEvent.mockReset();

    (useTopicData as any).mockReturnValue({
      topicData: { address: mockAddress },
    });

    render(<OloLocationResult />);

    const nextButton = screen.queryByTestId(NEXT_BUTTON) as HTMLElement;
    expect(nextButton).toHaveTextContent(/naar het omgevingsloket/i);

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it("should handle prev button", () => {
    mockMatomoTrackEvent.mockReset();

    render(<OloLocationResult />);

    const prevButton = screen.getByText("Vorige");
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  });

  it("should call the redirect", () => {
    (useTopicData as any).mockReturnValue({
      topicData: mockDefaultTopic,
    });

    render(<OloLocationResult />);

    expect(mockHistoryReplace).toBeCalled();
  });
});
