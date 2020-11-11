import "@testing-library/jest-dom/extend-expect";

import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import Context from "../../__mocks__/context";
import { actions, eventNames, sections } from "../../config/matomo";
import { findTopicBySlug } from "../../utils";
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

const matomoTrackEvent = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    location: {
      pathname: "/dakkapel-plaatsen/vragen-en-uitkomst",
    },
    push: jest.fn(),
  }),
  useLocation: () => jest.fn(),
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("LocationInput", () => {
  const Wrapper = ({ addressMock, error, topicMock }) => {
    const topic = topicMock ? topicMock : findTopicBySlug("dakkapel-plaatsen");
    return (
      <Context topicMock={topic} addressMock={addressMock}>
        <LocationInput
          error={error}
          topic={topic}
          matomoTrackEvent={matomoTrackEvent}
          handleNewAddressSubmit={handleNewAddressSubmit}
        />
      </Context>
    );
  };

  it("should render correctly on OLO flow", () => {
    render(<Wrapper topicMock={findTopicBySlug("intern-verbouwen")} />);

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

    expect(matomoTrackEvent).toHaveBeenCalledTimes(0);
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

    fireEvent.submit(screen.queryByTestId("form"));

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
      // fireEvent.click(screen.getByText("Naar de vragen"));
      fireEvent.submit(screen.queryByTestId("form"));
    });

    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.SUBMIT_LOCATION,
      name: resultMonument,
    });

    expect(matomoTrackEvent).toHaveBeenCalledTimes(6);
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

    const prevButton = screen.queryByTestId(PREV_BUTTON);
    expect(prevButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(prevButton);
    });

    expect(matomoTrackEvent).toHaveBeenCalledTimes(1);
  });

  it("should handle the prev button", async () => {
    render(<Wrapper />);

    const prevButton = screen.queryByTestId(PREV_BUTTON);
    expect(prevButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(prevButton);
    });

    expect(matomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.INTRO}`,
    });

    expect(matomoTrackEvent).toHaveBeenCalledTimes(1);
  });

  xit("should handle the error state", () => {
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
