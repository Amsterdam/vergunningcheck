import React from "react";

import { DISCLAIMER_TEXT } from "../utils/test-ids";
import { render, screen } from "../utils/test-utils";
import Disclaimer from "./Disclaimer";

// @TODO: import this text from i18n
const text =
  "De gemeente Amsterdam doet er alles aan om u juiste informatie te geven. Maar u kunt aan deze uitkomst geen rechten ontlenen. Als u een aanvraag doet, kunt u zekerheid krijgen.";

describe("Disclaimer", () => {
  it("renders correctly", () => {
    render(<Disclaimer />);
    // Should be in document
    expect(screen.queryByTestId(DISCLAIMER_TEXT)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
