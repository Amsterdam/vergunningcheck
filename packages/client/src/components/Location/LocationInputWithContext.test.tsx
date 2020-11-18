import "@testing-library/jest-dom/extend-expect";

import { ApolloError } from "@apollo/client";
import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import { PREV_BUTTON } from "../../utils/test-ids";
import {
  act,
  fireEvent,
  mockMatomoTrackEvent,
  render,
  screen,
} from "../../utils/test-utils";
import LocationInput from "./LocationInput";

// This test is separated from the original `LocationInput.test
// because the `useTopicData` mock is hard to combine with non-hooked context

const handleNewAddressSubmit = jest.fn();

const mockAddress = {
  ...addressGraphQLMock[0].result.data.findAddress.exactMatch,
};

jest.mock("../../hooks/useTopicData", () => () => ({
  topicData: { address: mockAddress },
  setTopicData: jest.fn(),
}));

describe("LocationInput", () => {
  const Wrapper = ({ error }: { error?: ApolloError | undefined }) => (
    <LocationInput
      error={error}
      handleNewAddressSubmit={handleNewAddressSubmit}
    />
  );
  it("should handle with context", () => {
    const {
      houseNumberFull: resultHouseNumberFull,
      postalCode: resultPostalCode,
    } = addressGraphQLMock[0].result.data.findAddress.exactMatch;

    render(<Wrapper />);

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
});
