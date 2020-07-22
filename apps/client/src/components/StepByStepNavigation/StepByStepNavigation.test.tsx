import React from "react";

import { STEPBYSTEPITEM, STEPBYSTEPNAVIGATION } from "../../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../../utils/test-utils";
import { StepByStepItem, StepByStepNavigation } from ".";

const onClickMock = jest.fn();

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

    // Only render items with a `heading` prop
    expect(queryByTestId(STEPBYSTEPITEM)).toBeInTheDocument();
    expect(getByText("Foo")).toBeInTheDocument();
  });

  it("should render links correctly", () => {
    const { container, getByText } = render(
      <StepByStepNavigation>
        <StepByStepItem heading="no link" />
        <StepByStepItem
          onClick={onClickMock}
          heading="link with href"
          href="http://link-with-href"
        />
        <StepByStepItem heading="link with onClick" onClick={onClickMock} />
      </StepByStepNavigation>
    );

    // Items with the `href` prop should render as `<a />` with the correct `href`
    const anchorHref = getByText("link with href").closest("a");
    expect(anchorHref && anchorHref.getAttribute("href")).toEqual(
      "http://link-with-href"
    );

    // Items with the `onClick` prop should render as `<a />` without `href`
    const anchorOnClick = getByText("link with onClick").closest("a");
    expect(anchorOnClick && anchorOnClick.getAttribute("href")).toEqual(null);

    // Items with click events should not have a tabindex of `-1`
    expect(container.querySelectorAll("[tabindex='-1']").length).toEqual(1);
    expect(container.querySelectorAll("[tabindex='0']").length).toEqual(2);

    // Items should be able to handle click events
    act(() => {
      fireEvent.click(anchorHref);
      fireEvent.click(anchorOnClick);
    });

    expect(onClickMock).toHaveBeenCalledTimes(2);
  });

  it("should render different states correctly", () => {
    const styles = {
      blue: "#004699",
      gray: "#B4B4B4",
      large: "24px",
      small: "18px",
    };

    const { queryByTestId, container } = render(
      <StepByStepNavigation>
        <StepByStepItem data-testid="checked" heading="checked" checked />
        <StepByStepItem data-testid="done" heading="done" done />
        <StepByStepItem data-testid="active" heading="active" active />
        <StepByStepItem data-testid="disabled" heading="disabled" disabled />
      </StepByStepNavigation>
    );

    // The `checked` circle should be styled small and blue
    const checkedItem = queryByTestId("checked");
    const checkedCircle = checkedItem.querySelector("span");
    expect(checkedCircle).toHaveStyle(`width: ${styles.small}`);
    expect(checkedCircle).toHaveStyle(`background-color: ${styles.blue}`);

    // The `done` circle should be styled small and blue
    const doneCircle = queryByTestId("done").querySelector("span");
    expect(doneCircle).toHaveStyle(`width: ${styles.small}`);
    expect(doneCircle).toHaveStyle(`background-color: ${styles.blue}`);

    // The `active` circle should be styled large and blue
    const activeItem = queryByTestId("active");
    const activeCircle = activeItem.querySelector("span");
    expect(activeCircle).toHaveStyle(`width: ${styles.large}`);
    expect(activeCircle).toHaveStyle(`background-color: ${styles.blue}`);

    // The `disabled` circle should be styled small and gray
    const disabledItem = queryByTestId("disabled");
    const disabledCircle = disabledItem.querySelector("span");
    expect(disabledCircle).toHaveStyle(`width: ${styles.small}`);
    expect(disabledCircle).toHaveStyle(`background-color: ${styles.gray}`);

    // Only the `checked` item should render the `<svg />`
    expect(container.querySelectorAll("svg").length).toEqual(1);
    expect(checkedItem.querySelector("svg")).toBeInTheDocument();

    // Only the `active` item should render the `<h3 />`
    expect(container.querySelectorAll("h3").length).toEqual(1);
    expect(activeItem.querySelector("h3")).toBeInTheDocument();

    // Only the `disabled` item should have a `disabled` attribute
    expect(container.querySelectorAll("[disabled]").length).toEqual(1);
    expect(disabledItem).toHaveAttribute("disabled");
  });
});
