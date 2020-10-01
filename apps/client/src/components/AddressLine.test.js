import React from "react";

import addressMock from "../__mocks__/addressMock";
import { cleanup, render } from "../utils/test-utils";
import AddressLine from "./AddressLine";

afterEach(cleanup);

// @TODO enable this test again.
xit("AddressLine renders correctly", () => {
  const { queryByText } = render(<AddressLine address={addressMock} />);

  expect(queryByText("streetname 123")).toBeInTheDocument();
});
