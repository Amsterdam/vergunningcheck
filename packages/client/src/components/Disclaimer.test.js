import React from "react";

import { DISCLAIMER_TEXT } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import Disclaimer from "./Disclaimer";

// const text =
//   "Deze uitkomst is niet definitief. Uit deze vergunningcheck kunt u geen rechten halen.";

describe("Disclaimer", () => {
  it("renders correctly", () => {
    render(<Disclaimer />);
    // Should be in document
    expect(screen.queryByTestId(DISCLAIMER_TEXT)).toBeInTheDocument();
    // expect(screen.getByText(text)).toBeInTheDocument();
  });
});
