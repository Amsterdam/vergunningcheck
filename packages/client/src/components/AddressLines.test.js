import React from "react";

import addressMock from "../__mocks__/addressMock";
import { render } from "../utils/test-utils";
import AddressLines from "./AddressLines";

describe("AddressLine", () => {
  it("renders correctly", () => {
    const { queryByText } = render(
      <AddressLines
        houseNumberFull={addressMock.houseNumberFull}
        postalCode={addressMock.postalCode}
        residence={addressMock.residence}
        streetName={addressMock.streetName}
      />
    );

    expect(queryByText("streetname 123")).toBeInTheDocument();
    expect(queryByText("1234 AB Amsterdam")).toBeInTheDocument();

    expect(queryByText("rendered")).not.toBeInTheDocument();
  });

  it("renders correctly with editAddressRenderer", () => {
    const { queryByText } = render(
      <AddressLines
        editAddressRenderer={() => <span>rendered</span>}
        houseNumberFull={addressMock.houseNumberFull}
        postalCode={addressMock.postalCode}
        residence={addressMock.residence}
        streetName={addressMock.streetName}
      />
    );

    expect(queryByText("rendered")).toBeInTheDocument();
  });
});