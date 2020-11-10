import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import { CheckerProvider } from "../../CheckerContext";
import { LOCATION_FOUND } from "../../utils/test-ids";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/test-utils";
import OloLocationInput from "./OloLocationInput";

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    handleSubmit: jest.fn(),
  }),
}));

const mockMatomoTrackEvent = jest.fn();
jest.mock("../hooks/useTracking", () => {
  return jest.fn(() => ({
    matomoTrackEvent: mockMatomoTrackEvent,
  }));
});

window.history.pushState({}, "Locatie pagina", "/dakkapel-plaatsen/locatie");

describe("OloLocationInput", () => {
  const Wrapper = ({ addressMock }: any) => {
    return (
      <CheckerProvider defaultAutofillData={{ address: addressMock }}>
        <OloLocationInput />
      </CheckerProvider>
    );
  };

  it("should render correctly", () => {
    render(<Wrapper />);

    expect(screen.queryByText("Invullen adres")).toBeInTheDocument();

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).toBeInTheDocument();
    expect(inputPostalCode).not.toHaveValue();

    expect(inputHouseNumber).toBeInTheDocument();
    expect(inputHouseNumber).not.toHaveValue();

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(0);
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

    render(<Wrapper />, {}, addressGraphQLMock);

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

  it("should render correctly with preset context", () => {
    const addressMock = {
      ...addressGraphQLMock[0].request.variables,
    };

    const {
      houseNumberFull,
      postalCode,
    } = addressGraphQLMock[0].request.variables;

    render(<Wrapper addressMock={addressMock} />, {}, addressGraphQLMock);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).toHaveValue(postalCode);
    expect(inputHouseNumber).toHaveValue(houseNumberFull);
  });
});
