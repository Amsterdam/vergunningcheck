import "@testing-library/jest-dom/extend-expect";

import { ApolloError } from "@apollo/client";
import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import { actions, eventNames, sections } from "../../config/matomo";
import nl from "../../i18n/nl";
import {
  LOCATION_FOUND,
  LOCATION_SUMMARY,
  PREV_BUTTON,
} from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
  screen,
  waitFor,
} from "../../utils/test-utils";
import LocationInput from "./LocationInput";

const handleNewAddressSubmit = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("LocationInput", () => {
  const Wrapper = ({ error }: { error?: ApolloError | undefined }) => (
    <LocationInput
      error={error}
      handleNewAddressSubmit={handleNewAddressSubmit}
    />
  );
  it("should render correctly on first load", () => {
    render(<Wrapper />);

    expect(
      screen.queryByText(nl.translation.location.testing["address input"])
    ).toBeInTheDocument();

    const inputPostalCode = screen.getByLabelText(
      nl.translation.common["postalcode label"]
    );
    const inputHouseNumber = screen.getByLabelText(
      nl.translation.common["housenumber label"]
    );

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

    const inputPostalCode = screen.getByLabelText(
      nl.translation.common["postalcode label"]
    );
    const inputHouseNumber = screen.getByLabelText(
      nl.translation.common["housenumber label"]
    );

    await act(async () => {
      fireEvent.change(inputPostalCode, {
        target: { value: "" },
      });
      fireEvent.change(inputHouseNumber, {
        target: { value: "" },
      });
    });

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

    expect(screen.queryByTestId(LOCATION_FOUND)).toBeInTheDocument();
    expect(screen.queryByTestId(LOCATION_SUMMARY)).toBeInTheDocument();

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
      fireEvent.submit(screen.queryByTestId("form") as HTMLElement);
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.FORWARD} ${sections.QUESTIONS}`,
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.SUBMIT_MONUMENT,
      name: resultMonument,
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.SUBMIT_NEIGHBORHOOD,
      name: nl.translation.common.unknown,
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.SUBMIT_DISTRICT,
      name: nl.translation.common.unknown,
    });

    expect(handleNewAddressSubmit).toHaveBeenCalledTimes(1);
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
    render(<Wrapper error={new ApolloError({})} />);

    expect(
      screen.queryByText(
        nl.translation.errorMessages[
          "unfortunately we cannot get address results"
        ]
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        nl.translation.errorMessages[
          "please try again later or contact the city on"
        ],
        { exact: false }
      )
    ).toBeInTheDocument();
  });
});
