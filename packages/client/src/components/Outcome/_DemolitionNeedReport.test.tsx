import React from "react";

import text from "../../i18n/nl";
import { render, screen } from "../../utils/test-utils";
import DemolitionNeedReport from "./DemolitionNeedReport";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

describe("DemolitionNeedReport", () => {
  it("renders the 'needs permit' outcome correctly", () => {
    render(<DemolitionNeedReport />);

    expect(
      screen.getByText(
        text.translation.outcome.payAttentionTo["pay attention heading"]
      )
    ).toBeInTheDocument();
  });
});
