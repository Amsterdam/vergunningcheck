import React from "react";

import text from "../../i18n/nl";
import { render, screen } from "../../utils/test-utils";
import DemolitionPermitFree from "./DemolitionPermitFree";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakraam-plaatsen" }),
}));

describe("DemolitionPermitFree", () => {
  it("renders the 'needs permit' outcome correctly", () => {
    render(<DemolitionPermitFree />);

    expect(
      screen.getByText(
        text.translation.outcome.payAttentionTo["pay attention heading"]
      )
    ).toBeInTheDocument();
  });
});
