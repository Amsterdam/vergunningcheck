import React from "react";

import { cleanup, render } from "../utils/test-utils";
import PrintDetails from "./PrintDetails";

afterEach(cleanup);

it("PrintDetails renders correctly", () => {
  const { queryByText } = render(<PrintDetails />);

  expect(queryByText("Pagina")).toBeInTheDocument();
  expect(queryByText("Datum")).toBeInTheDocument();
});
