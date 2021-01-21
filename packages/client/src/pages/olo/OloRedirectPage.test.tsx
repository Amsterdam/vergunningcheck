import React from "react";

import mockAddress from "../../__mocks__/addressMock";
import nl from "../../i18n/nl";
import { render, screen } from "../../utils/test-utils";
import OloRedirectPage from "./OloRedirectPage";

jest.useFakeTimers();

jest.mock("../../hooks/useTopicData", () => () => ({
  topicData: { address: mockAddress },
}));

describe("OloRedirectPage", () => {
  it("should render correctly", () => {
    render(<OloRedirectPage />);

    expect(
      screen.queryByText(nl.translation.common["one moment please"])
    ).toBeInTheDocument();

    expect(window.open).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(2001);

    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
