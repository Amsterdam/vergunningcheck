import React from "react";

import { STEPBYSTEPITEM, STEPBYSTEPNAVIGATION } from "../../../utils/test-ids";
import { cleanup, render } from "../../../utils/test-utils";
import { StepByStepItem, StepByStepNavigation } from ".";

afterEach(cleanup);

describe("StepByStepNavigation", () => {
  it("should not render without children", () => {
    const { queryByTestId } = render(<StepByStepNavigation />);
    expect(queryByTestId(STEPBYSTEPNAVIGATION)).not.toBeInTheDocument();
  });

  it("should not render without heading", () => {
    const { queryByTestId } = render(
      <StepByStepNavigation>
        <StepByStepItem heading="" />
      </StepByStepNavigation>
    );
    expect(queryByTestId(STEPBYSTEPNAVIGATION)).toBeInTheDocument();
    expect(queryByTestId(STEPBYSTEPITEM)).not.toBeInTheDocument();
  });

  it("should render", () => {
    const { queryByTestId, getByText } = render(
      <StepByStepNavigation>
        <StepByStepItem heading="Foo" />
      </StepByStepNavigation>
    );
    expect(queryByTestId(STEPBYSTEPITEM)).toBeInTheDocument();
    expect(getByText("Foo")).toBeInTheDocument();
  });
});
