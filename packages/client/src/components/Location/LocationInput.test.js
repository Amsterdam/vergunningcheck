import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import Context from "../../__mocks__/context";
import { findTopicBySlug } from "../../utils";
import { LOCATION_FOUND } from "../../utils/test-ids";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/test-utils";
import LocationInput from "./LocationInput";

const handleNewAddressSubmit = jest.fn();

const matomoTrackEvent = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    location: {
      pathname: "/dakkapel-plaatsen/vragen-en-conclusie",
    },
    push: jest.fn(),
  }),
  useLocation: () => jest.fn(),
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

describe("LocationFinder", () => {
  const topic = findTopicBySlug("dakkapel-plaatsen");

  const Wrapper = ({ addressMock }) => (
    <Context topicMock={topic} addressMock={addressMock}>
      <LocationInput
        topic={topic}
        matomoTrackEvent={matomoTrackEvent}
        handleNewAddressSubmit={handleNewAddressSubmit}
      />
    </Context>
  );

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

    expect(matomoTrackEvent).toHaveBeenCalledTimes(0);
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

    expect(matomoTrackEvent).toHaveBeenCalledTimes(0);

    await act(async () => {
      fireEvent.click(screen.getByText("Naar de vragen"));
    });

    expect(matomoTrackEvent).toHaveBeenCalledTimes(4);
  });
});
