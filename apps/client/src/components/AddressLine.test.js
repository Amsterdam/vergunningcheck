import React from "react";

import addressMock from "../__mocks__/address";
import { cleanup, render } from "../utils/test-utils";
import AddressLine from "./AddressLine";

afterEach(cleanup);

it("AddressLine renders correctly with the `strong` prop", () => {
  const { container, queryByText } = render(
    <AddressLine address={addressMock} strong />
  );

  expect(queryByText("streetname 123")).toBeInTheDocument();
  expect(container.querySelector("strong")).toBeInTheDocument();
});

it("AddressLine renders correctly without the `strong` prop", () => {
  const { container, queryByText } = render(
    <AddressLine address={addressMock} />
  );

  expect(queryByText("streetname 123")).toBeInTheDocument();
  expect(container.querySelector("strong")).not.toBeInTheDocument();
});
