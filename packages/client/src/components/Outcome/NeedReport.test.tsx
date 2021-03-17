import React from "react";

import text from "../../i18n/nl";
import { NEED_REPORT_BUTTON } from "../../utils/test-ids";
import { render, screen } from "../../utils/test-utils";
import NeedReport from "./NeedReport";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

describe("NeedReport", () => {
  it("renders the 'needs report' outcome correctly", () => {
    render(<NeedReport />);

    expect(screen.queryByTestId(NEED_REPORT_BUTTON)).toBeInTheDocument();

    expect(
      screen.getByText(
        text.translation.outcome.needReport[
          "on this page you can read more about report"
        ]
      )
    ).toBeInTheDocument();
  });
});
