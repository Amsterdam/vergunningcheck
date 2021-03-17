import React from "react";

import addressMock from "../__mocks__/addressMock";
import { render, screen } from "../utils/test-utils";
import AddressLines from "./AddressLines";

describe("AddressLine", () => {
  it("renders correctly", () => {
    render(<AddressLines gutterBottom={0} address={addressMock} />);

    expect(screen.queryByText("streetname 123")).toBeInTheDocument();
    expect(screen.queryByText("1234 AB Amsterdam")).toBeInTheDocument();

    expect(screen.queryByText("rendered")).not.toBeInTheDocument();
  });

  it("renders correctly with editAddressRenderer", () => {
    render(
      <AddressLines
        gutterBottom={0}
        editAddressRenderer={() => <span>rendered</span>}
        address={addressMock}
      />
    );

    expect(screen.queryByText("rendered")).toBeInTheDocument();
  });

  it("should not render", () => {
    render(
      <AddressLines
        address={null}
        editAddressRenderer={() => <span>rendered</span>}
        gutterBottom={0}
      />
    );

    expect(screen.queryByText("rendered")).not.toBeInTheDocument();
  });
});
