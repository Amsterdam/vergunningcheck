import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import Context from "../../__mocks__/context";
import { findTopicBySlug } from "../../utils/index";
import { LOCATION_FOUND } from "../../utils/test-ids";
import { act, render, screen } from "../../utils/test-utils";
import LocationFinder from "./LocationFinder";

const setAddress = jest.fn();
const setFocus = jest.fn();
const setErrorMessage = jest.fn();

const mockedFunctions = { ...{ setAddress, setFocus, setErrorMessage } };

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

const addressMock = {
  ...addressGraphQLMock[0].request.variables,
};

describe("LocationFinder", () => {
  const topic = findTopicBySlug("dakkapel-plaatsen");

  const WrapperWithContext = (props) => {
    const addressMock = {
      ...addressGraphQLMock[0].request.variables,
    };
    return (
      <Context topicMock={topic} addressMock={addressMock}>
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
    const {
      houseNumberFull,
      postalCode,
      streetName,
    } = addressGraphQLMock[0].result.data.findAddress.exactMatch;

    render(
      <WrapperWithContext sessionAddress={addressMock} />,
      {},
      addressGraphQLMock
    );

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    // Make sure the input fields have the right values
    expect(inputPostalCode).toHaveValue(addressMock.postalCode);
    expect(inputHouseNumber).toHaveValue(addressMock.houseNumber);

    // Make sure postalcode from userInput is equal to mocks
    expect(addressMock.postalCode).toBe(postalCode);

    expect(
      screen.queryByText(houseNumberFull, { exact: false })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(postalCode, { exact: false })
    ).not.toBeInTheDocument();

    // Wait for the input to stop loading
    await act(async () => {});

    // Location has been found
    const locationMessage = await screen.getByTestId(LOCATION_FOUND);
    expect(locationMessage).toBeInTheDocument();

    // Find the full address on the page
    expect(
      screen.getByText(`${streetName} ${houseNumberFull}`, { exact: false })
    ).toBeInTheDocument();
  });
});
