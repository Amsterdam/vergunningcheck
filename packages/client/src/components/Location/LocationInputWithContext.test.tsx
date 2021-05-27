import React from "react";

import addressGraphQLMock from "../../__mocks__/address";
import { actions, eventNames, sections } from "../../config/matomo";
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

const mockAddress = {
  ...addressGraphQLMock[0].result.data.findAddress.exactMatch,
};

jest.mock("../../hooks/useTopicData", () => () => ({
  topicData: { address: mockAddress },
  setTopicData: jest.fn(),
}));

describe("LocationInput", () => {
  it("should handle with context", () => {
    const {
      houseNumberFull: resultHouseNumberFull,
      postalCode: resultPostalCode,
    } = addressGraphQLMock[0].result.data.findAddress.exactMatch;

    render(<LocationInput handleNewAddressSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/postcode/i)).toHaveValue(resultPostalCode);
    expect(screen.getByLabelText(/huisnummer/i)).toHaveValue(
      resultHouseNumberFull
    );

    const prevButton = screen.queryByTestId(PREV_BUTTON) as HTMLElement;
    expect(prevButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(prevButton);
    });

    expect(mockMatomoTrackEvent).toBeCalledWith({
      action: actions.CLICK_INTERNAL_NAVIGATION,
      name: `${eventNames.BACK} ${sections.INTRO}`,
    });
  });
});
