import React from "react";

import text from "../../../i18n/nl";
import { NEED_PERMIT_BUTTON } from "../../../utils/test-ids";
import { render, screen } from "../../../utils/test-utils";
import NeedPermit from "./NeedPermit";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ slug: "dakkapel-plaatsen" }),
}));

describe("NeedPermit", () => {
  it("renders the 'needs permit' outcome correctly", () => {
    render(<NeedPermit />);

    expect(screen.queryByTestId(NEED_PERMIT_BUTTON)).toBeInTheDocument();

    expect(
      screen.getByText(
        text.translation.outcome.needPermit[
          "on this page you can read more how to apply"
        ]
      )
    ).toBeInTheDocument();
  });

  it("doens't render", () => {
    render(<NeedPermit contentText="" />);

    expect(screen.queryByTestId(NEED_PERMIT_BUTTON)).not.toBeInTheDocument();
  });
});
