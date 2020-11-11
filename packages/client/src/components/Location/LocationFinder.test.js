import "@testing-library/jest-dom/extend-expect";

import React from "react";

import locationFinderGraphQLMocks from "../../__mocks__/locationFinderGraphQLMocks";
import { findTopicBySlug } from "../../utils/index";
import {
  AUTOSUGGEST_ITEM,
  AUTOSUGGEST_LIST,
  LOCATION_FOUND,
  LOCATION_NOT_FOUND,
} from "../../utils/test-ids";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/test-utils";
import LocationFinder from "./LocationFinder";

const setAddress = jest.fn();
const setErrorMessage = jest.fn();
const matomoTrackEvent = jest.fn();

const mockedFunctions = {
  ...{ matomoTrackEvent, setAddress, setErrorMessage },
};

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

describe("LocationFinder", () => {
  const loadingText = "Wij zoeken het adres.";
  const topic = findTopicBySlug("dakkapel-plaatsen");

  const Wrapper = () => {
    const [focus, setFocus] = React.useState(false);

    return (
      <LocationFinder
        topic={topic}
        sessionAddress={{}}
        {...mockedFunctions}
        {...{ focus, setFocus, setErrorMessage }}
      />
    );
  };

  it("should render correctly (including autosuggest)", async () => {
    render(<Wrapper />, {}, locationFinderGraphQLMocks);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    expect(inputPostalCode).toHaveValue("");
    expect(inputHouseNumber).toHaveValue("");

    // Change the input values to make sure the location is "not found"
    await act(async () => {
      fireEvent.change(inputPostalCode, {
        target: { value: "1055XD" },
      });
      fireEvent.change(inputHouseNumber, {
        target: { value: "1" },
      });
    });

    await waitFor(() => screen.queryByText(loadingText));
    await waitFor(() => screen.getByTestId(LOCATION_NOT_FOUND));

    // Change the input values to display the autosuggest
    await act(async () => {
      fireEvent.focus(inputHouseNumber);

      fireEvent.keyDown(inputHouseNumber, {
        target: { value: "19" },
      });

      fireEvent.change(inputHouseNumber);
    });

    await waitFor(() => screen.getByTestId(AUTOSUGGEST_LIST));
    expect(screen.queryAllByTestId(AUTOSUGGEST_ITEM).length).toBe(6);
    expect(screen.queryByText("19 C")).toBeInTheDocument();

    // Press Enter to make sure the location is "not found" (again)
    await act(async () => {
      fireEvent.keyDown(inputHouseNumber, {
        key: "Enter",
      });
    });

    await waitFor(() => screen.queryByText(loadingText));
    await waitFor(() => screen.getByTestId(LOCATION_NOT_FOUND));

    // Enable the autosuggest (again)
    await act(async () => {
      fireEvent.focus(inputHouseNumber);
    });

    // Select an option from the autosuggest and make sure the location is found
    await act(async () => {
      fireEvent.mouseDown(screen.queryByText("19 C"));
    });

    await waitFor(() => screen.queryByText(loadingText));
    await waitFor(() => screen.getByTestId(LOCATION_FOUND));
  });

  it("should handle errors", async () => {
    render(<Wrapper />, {}, locationFinderGraphQLMocks);

    const inputPostalCode = screen.getByLabelText(/postcode/i);
    const inputHouseNumber = screen.getByLabelText(/huisnummer/i);

    // This detects an invalid postalCode
    await act(async () => {
      fireEvent.focus(inputPostalCode);
      fireEvent.change(inputPostalCode, {
        target: { value: "1055" },
      });
      fireEvent.blur(inputPostalCode);
    });

    await waitFor(() =>
      screen.queryByText(`Dit is geen geldige postcode.`, { exact: false })
    );

    // This handles the graphql errors
    await act(async () => {
      fireEvent.change(inputPostalCode, {
        target: { value: "6666AB" },
      });
      fireEvent.change(inputHouseNumber, {
        target: { value: "666" },
      });
    });

    // expect(setErrorMessage).toBeCalled();
  });
});
