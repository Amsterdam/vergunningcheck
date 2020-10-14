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

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

// @TODO: Let's fetch this data from a new mocked packages/module
const mockedAddress = {
  address: {
    houseNumber: "19c",
    houseNumberFull: "19c",
    postalCode: "1055XD",
  },
};

describe("LocationFinder", () => {
  const topic = findTopicBySlug("dakkapel-plaatsen");

  const WrapperWithContext = (props) => {
    return (
      <Context topicMock={topic} addressMock={mockedAddress.address}>
        <LocationFinder topic={topic} {...props} {...mockedFunctions} />
      </Context>
    );
  };

  it("should render correctly on first load", () => {
    render(<WrapperWithContext sessionAddress={{}} />);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).toBeInTheDocument();
    expect(inputPostalCode).not.toHaveValue();

    expect(inputHouseNumber).toBeInTheDocument();
    expect(inputHouseNumber).not.toHaveValue();
  });

  // @TODO: Update this test with autoSuggest
  it("should render correctly with contextual props", async () => {
    render(
      <WrapperWithContext sessionAddress={mockedAddress.address} />,
      {},
      mocks
    );

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    // Make sure the input fields have the right values
    expect(inputPostalCode).toHaveValue(mockedAddress.postalCode);
    expect(inputHouseNumber).toHaveValue(mockedAddress.houseNumber);
  });

  // @TODO: Update this test with autoSuggest
  it("should render correctly when filling the in the form", async () => {
    const {
      houseNumberFull,
      postalCode,
      streetName,
    } = mocks[0].result.data.findAddress.exactMatch;

    render(
      <WrapperWithContext sessionAddress={mockedAddress.address} />,
      {},
      mocks
    );

    // Mock values we're using as user input
    const userInput = mockedAddress.address;

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

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
