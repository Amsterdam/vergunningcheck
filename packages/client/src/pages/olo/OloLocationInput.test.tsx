import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import nl from "../../i18n/nl";
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

window.history.pushState({}, "Locatie pagina", "/dakkapel-plaatsen/locatie");

// XXX to fix
xdescribe("OloLocationInput", () => {
  it("should render correctly", () => {
    render(<OloLocationInput />);
    screen.debug();
    expect(
      screen.queryByText(nl.translation.location["enter location"])
    ).toBeInTheDocument();

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).toBeInTheDocument();
    expect(inputPostalCode).not.toHaveValue();

    expect(inputHouseNumber).toBeInTheDocument();
    expect(inputHouseNumber).not.toHaveValue();

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(0);
  });

  xit("should handle next button", async () => {
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

    expect(inputPostalCode).not.toHaveValue();
    expect(inputHouseNumber).not.toHaveValue();

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

    /**
     * The correct address is displayed on the screen
     */

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
        "Over dit adres hebben we de volgende gegevens gevonden:"
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Het gebouw is een gemeentelijk monument.")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Het gebouw ligt niet in een beschermd stads- of dorpsgezicht."
      )
    ).toBeInTheDocument();

    expect(screen.queryByText("zoningplan")).not.toBeInTheDocument();

    /**
     * Continue with the next button
     */

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(0);

    await act(async () => {
      fireEvent.click(screen.getByText("Volgende"));
    });

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(0);
  });

  xit("should render correctly with preset context", () => {
    const mockAddress = {
      ...addressGraphQLMock[0].request.variables,
    };
    jest.mock("../../hooks/useTopicData", () => () => ({
      topicData: { address: mockAddress },
    }));

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
});