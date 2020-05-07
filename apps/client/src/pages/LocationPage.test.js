import React from "react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import Router from "../components/Router";
import { render, fireEvent, cleanup, screen, act } from "../utils/test-utils";
import Context from "../__mocks__/context";

import { topics } from "../config";
import LocationPage from "./LocationPage";
import mocks from "./__mocks__/address";
import {
  LOCATION_FOUND,
  ADDRESS_PAGE,
  NEXT_BUTTON,
  PREV_BUTTON,
} from "../utils/test-ids";

afterEach(cleanup);

describe("<LocationPage />", () => {
  window.scrollTo = jest.fn();
  window.history.pushState({}, "Locatie pagina", "/dakkapel-plaatsen/locatie");
  const topicMock = "dakkapel-plaatsen";
  const topic = topics.find((t) => t.slug === topicMock);

  const Wrapper = () => {
    const history = createMemoryHistory();
    return (
      <Router history={history}>
        <LocationPage />
      </Router>
    );
  };

  const WrapperWithContext = ({ addressMock }) => {
    return (
      <Context topicMock={topic} addressMock={addressMock}>
        <Wrapper />
      </Context>
    );
  };

  it("renders correctly on first load", () => {
    const { container } = render(<Wrapper />);

    expect(screen.getByText(topic.text.locationIntro + ".")).toBeTruthy();
    expect(screen.getByText("Postcode")).toBeTruthy();
    expect(screen.getByText("Huisnummer")).toBeTruthy();

    const postalCode = container.querySelector('input[name="postalCode"]');
    expect(postalCode).toBeTruthy();
    expect(postalCode.value).toBe("");

    const houseNumberFull = container.querySelector(
      'input[name="houseNumberFull"]'
    );
    expect(houseNumberFull).toBeTruthy();
    expect(houseNumberFull.value).toBe("");
  });

  it("can navigate with prev and next buttons", () => {
    const { getByTestId } = render(<Wrapper />);

    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(window.location.pathname).toBe("/dakkapel-plaatsen/locatie");

    const prevButton = getByTestId(PREV_BUTTON);
    expect(prevButton).toBeTruthy();
    expect(prevButton.type).toEqual("button");

    const nextButton = getByTestId(NEXT_BUTTON);
    expect(nextButton).toBeTruthy();
    expect(nextButton.type).toEqual("submit");

    // Navigate to previous page (IntroPage)
    fireEvent.click(prevButton);

    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(window.location.pathname).toBe("/dakkapel-plaatsen");

    // Navigate to next page (LocationPage)
    fireEvent.click(getByTestId(NEXT_BUTTON));

    expect(window.scrollTo).toBeCalledWith(0, 0);
    expect(window.location.pathname).toBe("/dakkapel-plaatsen/locatie");
  });

  it("renders correctly with predefined context", async () => {
    let container;

    const addressMock = {
      postalCode: "1055xd",
      houseNumberFull: "19c",
    };

    // Needed to wrap this in an act() function to avoid act() warnings
    await act(async () => {
      ({ container } = render(
        <WrapperWithContext addressMock={addressMock} />
      ));
    });

    // Compare postalCode with context mock
    const postalCode = container.querySelector('input[name="postalCode"]');
    expect(postalCode).toBeTruthy();
    expect(postalCode.value).toBe(addressMock.postalCode);

    // Compare houseNumberFull with context mock
    const houseNumberFull = container.querySelector(
      'input[name="houseNumberFull"]'
    );
    expect(houseNumberFull).toBeTruthy();
    expect(houseNumberFull.value).toBe(addressMock.houseNumberFull);
  });

  it("handles the submit", async () => {
    const {
      postalCode,
      streetName,
      houseNumberFull,
    } = mocks[0].result.data.findAddress.exactMatch;

    const { container, getByText, findByTestId } = render(
      <WrapperWithContext addressMock={mocks[0].result.data.findAddress.exactMatch}  />,
      {},
      mocks
    );

    const userInput = {
      postalCode: "1055xd",
      houseNumberFull: "19c",
    };

    // Make sure postalcode from userInput is equal to mocks
    expect(userInput.postalCode).toBe(mocks[0].request.variables.postalCode);
    expect(userInput.postalCode).toBe(postalCode.toLowerCase());

    expect(window.location.pathname).toBe("/dakkapel-plaatsen/locatie");

    const postalCodeInput = container.querySelector('input[name="postalCode"]');
    const houseNumberInput = container.querySelector(
      'input[name="houseNumberFull"]'
    );

    act(() => {
      fireEvent.change(postalCodeInput, {
        target: { value: userInput.postalCode },
      });
      fireEvent.change(houseNumberInput, {
        target: { value: userInput.houseNumberFull },
      });
    });

    // After mocked data has been loaded, we expect the location to be found
    await findByTestId(LOCATION_FOUND);

    // Click on submit and go to the next page
    act(() => {
      fireEvent.click(container.querySelector('button[type="submit"]'));
    });

    await findByTestId(ADDRESS_PAGE);

    // Expect the full address to be found on the page
    expect(getByText(`${streetName} ${houseNumberFull}`)).toBeTruthy();

    expect(window.location.pathname).toBe("/dakkapel-plaatsen/adresgegevens");
  });
});
