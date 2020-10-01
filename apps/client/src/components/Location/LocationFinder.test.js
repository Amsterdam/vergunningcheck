import "@testing-library/jest-dom/extend-expect";

import React from "react";

import mocks from "../../__mocks__/address";
import Context from "../../__mocks__/context";
import { findTopicBySlug } from "../../utils/index";
import { LOCATION_FOUND } from "../../utils/test-ids";
import { act, fireEvent, render, screen } from "../../utils/test-utils";
import LocationFinder from "./LocationFinder";

const setAddress = jest.fn();
const setFocus = jest.fn();
const setErrorMessage = jest.fn();

const mockedFunctions = { ...{ setAddress, setFocus, setErrorMessage } };

// @TODO: Let's fetch this data from a new mocked packages/module
const mockedAddress = {
  houseNumber: "19",
  houseNumberFull: "19c",
  postalCode: "1055XD",
  suffix: "c",
};

describe("LocationFinder", () => {
  const topic = findTopicBySlug("dakkapel-plaatsen");

  const WrapperWithContext = (props) => {
    return (
      <Context topicMock={topic} addressMock={mockedAddress}>
        <LocationFinder {...props} {...mockedFunctions} />
      </Context>
    );
  };

  // @TODO enable these test again
  xit("should render correctly on first load", () => {
    render(<WrapperWithContext />);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);
    const inputSuffix = screen.getByLabelText(/toevoeging/i);

    expect(inputPostalCode).toBeInTheDocument();
    expect(inputPostalCode).not.toHaveValue();

    expect(inputHouseNumber).toBeInTheDocument();
    expect(inputHouseNumber).not.toHaveValue();

    expect(inputSuffix).toBeInTheDocument();
    expect(inputSuffix).not.toHaveValue();
  });

  xit("should render correctly with contextual props", async () => {
    render(<WrapperWithContext {...mockedAddress} />, {}, mocks);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);
    const inputSuffix = screen.getByLabelText(/toevoeging/i);

    // Make sure the input fields have the right values
    expect(inputPostalCode).toHaveValue(mockedAddress.postalCode);
    expect(inputHouseNumber).toHaveValue(parseInt(mockedAddress.houseNumber));
    expect(inputSuffix).toHaveValue(mockedAddress.suffix);

    // The loading state should be active
    // @TODO: replace this to come directly from i18n
    expect(screen.getByText("Laden...")).toBeInTheDocument();
    expect(screen.getByText("Wij zoeken het adres.")).toBeInTheDocument();
  });

  xit("should render correctly when filling the in the form", async () => {
    const {
      houseNumberFull,
      postalCode,
      streetName,
    } = mocks[0].result.data.findAddress.exactMatch;

    render(<WrapperWithContext {...mockedAddress} />, {}, mocks);

    // Mock values we're using as user input
    const userInput = mockedAddress;

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);
    const inputSuffix = screen.getByLabelText(/toevoeging/i);

    // Make sure postalcode from userInput is equal to mocks
    expect(userInput.postalCode).toBe(postalCode);

    // Set the input values via the change event
    await act(async () => {
      fireEvent.change(inputPostalCode, {
        target: { value: userInput.postalCode },
      });
      fireEvent.change(inputHouseNumber, {
        target: { value: userInput.houseNumber },
      });
      fireEvent.change(inputSuffix, {
        target: { value: userInput.suffix },
      });
    });

    // Wait until loading is finished and location has been found
    const locationMessage = await screen.getByTestId(LOCATION_FOUND);
    expect(locationMessage).toBeInTheDocument();

    // Find the full address on the page
    expect(
      screen.getByText(`${streetName} ${houseNumberFull}`, { exact: false })
    ).toBeInTheDocument();

    expect(setAddress).toBeCalledTimes(1);
  });
});
