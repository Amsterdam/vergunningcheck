import React from "react";

import { render } from "../utils/test-utils";
import PrintDetails from "./PrintDetails";

it("PrintDetails renders correctly", () => {
  const { queryByText } = render(<PrintDetails />);

  expect(queryByText("Pagina")).toBeInTheDocument();
  expect(queryByText("Datum")).toBeInTheDocument();
});
