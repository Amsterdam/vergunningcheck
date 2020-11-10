import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import { CheckerProvider } from "../../CheckerContext";
import { actions, eventNames, sections } from "../../config/matomo";
import { LOCATION_FOUND, PREV_BUTTON } from "../../utils/test-ids";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/test-utils";
import LocationInput from "./LocationInput";

const handleNewAddressSubmit = jest.fn();
const mockMatomoTrackEvent = jest.fn();
jest.mock("../../hooks/useTracking", () => {
  return jest.fn(() => ({
    matomoTrackEvent: mockMatomoTrackEvent,
  }));
});

describe("LocationInput", () => {
  type WrapperProps = {
    mockSlug?: string;
    addressMock?: any;
    error?: any;
  };
  const Wrapper = ({
    mockSlug = "dakkapel-plaatsen",
    addressMock,
    error,
  }: WrapperProps) => {
    jest.mock("../../hooks/useSlug", () => {
      return jest.fn(() => mockSlug);
    });

    jest.mock("react-router-dom", () => ({
      useHistory: () => ({
        location: {
          pathname: `/${mockSlug}/vragen-en-conclusie`,
        },
        push: jest.fn(),
      }),
      useLocation: () => jest.fn(),
      useParams: () => ({ slug: mockSlug }),
    }));

    return (
      <CheckerProvider defaultAutofillData={{ address: addressMock }}>
        <LocationInput
          error={error}
          handleNewAddressSubmit={handleNewAddressSubmit}
        />
      </CheckerProvider>
    );
  };

  it("should render correctly on OLO flow", () => {
    render(<Wrapper mockSlug="intern-verbouwen" />);
    expect(screen.queryByText("Invullen adres")).toBeInTheDocument();
  });

  it("should render correctly on first load", () => {
    render(<Wrapper />);

    expect(
      screen.queryByText(
        "Voer het adres in waar u de dakkapel wilt gaan plaatsen."
      )
    ).toBeInTheDocument();

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).toBeInTheDocument();
    expect(inputPostalCode).not.toHaveValue();

    expect(inputHouseNumber).toBeInTheDocument();
    expect(inputHouseNumber).not.toHaveValue();

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(0);
    expect(handleNewAddressSubmit).toHaveBeenCalledTimes(0);
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
      restrictions,
    } = addressGraphQLMock[0].result.data.findAddress.exactMatch;

    const { name: resultMonument } = restrictions[0];

    render(<Wrapper />, {}, addressGraphQLMock);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).not.toHaveValue();
    expect(inputHouseNumber).not.toHaveValue();

    fireEvent.submit(screen.queryByTestId("form") as HTMLElement);

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
    });
    fireEvent.blur(inputHouseNumber);

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

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(0);

    await act(async () => {
      // fireEvent.click(screen.getByText("Naar de vragen"));
      fireEvent.submit(screen.queryByTestId("form") as HTMLElement);
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.SUBMIT_LOCATION,
      name: resultMonument,
    });

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(4);
    expect(handleNewAddressSubmit).toHaveBeenCalledTimes(1);
  });

  it("should handle with context", async () => {
    const {
      houseNumberFull: resultHouseNumberFull,
      postalCode: resultPostalCode,
    } = addressGraphQLMock[0].result.data.findAddress.exactMatch;

    render(
      <Wrapper
        addressMock={addressGraphQLMock[0].result.data.findAddress.exactMatch}
      />
    );

    expect(screen.getByLabelText(/postcode/i)).toHaveValue(resultPostalCode);
    expect(screen.getByLabelText(/huisnummer/i)).toHaveValue(
      resultHouseNumberFull
    );

    const prevButton = screen.queryByTestId(PREV_BUTTON) as HTMLElement;
    expect(prevButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(prevButton);
    });

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(1);
  });

  it("should handle the prev button", async () => {
    render(<Wrapper />);

    const prevButton = screen.queryByTestId(PREV_BUTTON) as HTMLElement;
    expect(prevButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(prevButton);
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.INTRO}`,
    });

    expect(mockMatomoTrackEvent).toHaveBeenCalledTimes(1);
  });

  it("should handle the error state", () => {
    render(<Wrapper error={{ stack: "error message" }} />);

    expect(
      screen.queryByText(
        /helaas. wij kunnen nu geen adresgegevens opvragen waardoor/i,
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText("error message", { exact: false })
    ).toBeInTheDocument();
  });
});
