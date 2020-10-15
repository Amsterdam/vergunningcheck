import "@testing-library/jest-dom/extend-expect";

import React from "react";

import mocks from "../../__mocks__/address";
import addressMock from "../../__mocks__/addressMock";
import Context from "../../__mocks__/context";
import matchMedia from "../../__mocks__/matchMedia";
import { findTopicBySlug } from "../../utils";
import { LOCATION_FOUND } from "../../utils/test-ids";
import { act, fireEvent, render, screen } from "../../utils/test-utils";
import OloLocationInput from "./OloLocationInput";

Object.defineProperty(window, "matchMedia", matchMedia);

const matomoTrackEvent = jest.fn();
window.open = jest.fn();
window.scrollTo = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    location: {
      pathname: "/aanbouw-of-uitbouw-maken/adresgegevens",
    },
    push: jest.fn(),
  }),
  useLocation: () => jest.fn(),
  useParams: () => ({ slug: "aanbouw-of-uitbouw-maken" }),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    handleSubmit: jest.fn(),
  }),
}));

window.history.pushState({}, "Locatie pagina", "/dakkapel-plaatsen/locatie");

const mockedAddress = {
  address: {
    houseNumber: "19c",
    houseNumberFull: "19c",
    postalCode: "1055XD",
  },
};

describe("OloLocationInput", () => {
  const topic = findTopicBySlug("aanbouw-of-uitbouw-maken");

  const Wrapper = () => {
    return (
      <Context addressMock={mockedAddress} topicMock={topic}>
        <OloLocationInput matomoTrackEvent={matomoTrackEvent} topic={topic} />
      </Context>
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

    expect(matomoTrackEvent).toHaveBeenCalledTimes(0);
  });

  it("should handle next button", async () => {
    render(<Wrapper mock={addressMock} />, {}, mocks);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).not.toHaveValue();
    expect(inputHouseNumber).not.toHaveValue();

    await act(async () => {
      fireEvent.change(inputPostalCode, {
        target: { value: mockedAddress.address.postalCode },
      });
      fireEvent.change(inputHouseNumber, {
        target: { value: mockedAddress.address.houseNumberFull },
      });
      fireEvent.blur(inputHouseNumber);
    });

    await screen.getByTestId(LOCATION_FOUND);

    /**
     * The correct address is displayed on the screen
     */

    expect(
      screen.queryByText("Louise de Colignystraat 19 C")
    ).toBeInTheDocument();

    expect(screen.queryByText("1055XD Amsterdam")).toBeInTheDocument();

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

    expect(matomoTrackEvent).toHaveBeenCalledTimes(0);

    await act(async () => {
      fireEvent.click(screen.getByText("Volgende"));
    });

    expect(matomoTrackEvent).toHaveBeenCalledTimes(0);
  });
});
