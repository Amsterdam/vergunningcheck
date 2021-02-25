import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import nl from "../../i18n/nl";
import { findTopicBySlug } from "../../utils";
import { LOCATION_FOUND } from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
  screen,
  waitFor,
} from "../../utils/test-utils";
import OloLocationInput from "./OloLocationInput";

const { common } = nl.translation;

const mockTopic = findTopicBySlug("aanbouw-of-uitbouw-maken");
jest.mock("../../hooks/useTopic", () => () => mockTopic);

const mockAddress = {
  ...addressGraphQLMock[0].request.variables,
};

jest.mock("../../hooks/useTopicData", () => () => ({
  topicData: { address: mockAddress },
  setTopicData: jest.fn(),
}));

describe("OloLocationInput", () => {
  it("should render correctly with preset context", () => {
    const {
      houseNumberFull,
      postalCode,
    } = addressGraphQLMock[0].request.variables;

    render(<OloLocationInput />, {}, addressGraphQLMock);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).toHaveValue(postalCode);
    expect(inputHouseNumber).toHaveValue(houseNumberFull);
  });

  it("should handle next button", async () => {
    const {
      houseNumberFull,
      postalCode,
    } = addressGraphQLMock[0].request.variables;

    const {
      streetName: resultStreetName,
      houseNumberFull: resultHouseNumberFull,
      postalCode: resultPostalCode,
      residence: resultResidence,
    } = addressGraphQLMock[0].result.data.findAddress.exactMatch;

    render(<OloLocationInput />, {}, addressGraphQLMock);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(
      screen.queryByText(resultHouseNumberFull, { exact: false })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(resultPostalCode, { exact: false })
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.change(inputPostalCode, {
        target: { value: postalCode },
      });
      fireEvent.change(inputHouseNumber, {
        target: { value: houseNumberFull },
      });
      fireEvent.blur(inputHouseNumber);
    });

    // Wait for Location to be found
    await waitFor(() => screen.getByTestId(LOCATION_FOUND));

    // The correct address is displayed on the screen
    expect(
      screen.queryByText(`${resultStreetName} ${resultHouseNumberFull}`, {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByText(`${resultPostalCode} ${resultResidence}`, {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        common["we have found the following information about this address"]
      )
    ).toBeInTheDocument();

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
        common["the building is not located inside a city scape"]
      )
    ).toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();

    // Continue with the next button
    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(0);

    await act(async () => {
      fireEvent.click(screen.getByText(common.next));
    });

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(6);
  });
});
