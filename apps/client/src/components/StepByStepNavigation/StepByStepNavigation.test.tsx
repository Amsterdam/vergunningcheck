import "jest-styled-components";

import { ascDefaultTheme, themeColor, themeSpacing } from "@datapunt/asc-ui";
import React from "react";

import { STEPBYSTEPITEM, STEPBYSTEPNAVIGATION } from "../../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../../utils/test-utils";
import { StepByStepItem, StepByStepNavigation } from ".";

const onClickMock = jest.fn();

const styles = {
  blue: "#004699",
  gray: "#B4B4B4",
  large: "24px",
  small: "18px",
};

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
    expect(checkedCircle).toHaveStyleRule("width", styles.small);
    expect(checkedCircle).toHaveStyleRule("background-color", styles.blue);

    // The `done` circle should be styled small and blue
    const doneCircle = queryByTestId("done").querySelector("span");
    expect(doneCircle).toHaveStyleRule("width", styles.small);
    expect(doneCircle).toHaveStyleRule("background-color", styles.blue);

    // The `active` circle should be styled large and blue
    const activeItem = queryByTestId("active");
    const activeCircle = activeItem.querySelector("span");
    expect(activeCircle).toHaveStyleRule("width", styles.large);
    expect(activeCircle).toHaveStyleRule("background-color", styles.blue);

    // The `disabled` circle should be styled small and gray
    const disabledItem = queryByTestId("disabled");
    const disabledCircle = disabledItem.querySelector("span");
    expect(disabledCircle).toHaveStyleRule("width", styles.small);
    expect(disabledCircle).toHaveStyleRule("background-color", styles.gray);

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

  it("should render customSize states correctly", () => {
    const { queryByTestId } = render(
      <StepByStepNavigation cdata-testid="wrapper" customSize highlightActive>
        <StepByStepItem data-testid="small" heading="small" done />
        <StepByStepItem data-testid="large" heading="large" largeCircle />
        <StepByStepItem data-testid="active" heading="active" active />
        <StepByStepItem
          data-testid="color"
          heading="color"
          circleBackgroundColor="red"
        />
        <StepByStepItem
          data-testid="inactiveWithChildren"
          heading="inactiveWithChildren"
        >
          <span>Child</span>
        </StepByStepItem>
        <StepByStepItem
          data-testid="activeWithChildren"
          heading="activeWithChildren"
          largeCircle
        >
          <span>Child</span>
        </StepByStepItem>
      </StepByStepNavigation>
    );

    // The `small` circle should be styled small and blue
    const checkedItem = queryByTestId("small");
    const checkedCircle = checkedItem.querySelector("span");
    expect(checkedCircle).toHaveStyleRule("width", styles.small);
    expect(checkedCircle).toHaveStyleRule("background-color", styles.blue);

    // The `large` circle should be styled large and gray
    const doneCircle = queryByTestId("large").querySelector("span");
    expect(doneCircle).toHaveStyleRule("width", styles.large);
    expect(doneCircle).toHaveStyleRule("background-color", styles.gray);

    // The `color` circle should be styled with a custom color
    const colorCircle = queryByTestId("color").querySelector("span");
    expect(colorCircle).toHaveStyleRule("background-color", "red");

    // The `active` item should be styled with a custom background
    expect(queryByTestId("active")).toHaveStyleRule(
      "background-color",
      themeColor("tint", "level2")({ theme: ascDefaultTheme })
    );

    // Make sure the Heading `gutterBottom` is working
    expect(
      queryByTestId("inactiveWithChildren").querySelector("p")
    ).toHaveStyleRule(
      "margin-bottom",
      themeSpacing(3)({ theme: ascDefaultTheme })
    );
    expect(
      queryByTestId("activeWithChildren").querySelector("h3")
    ).toHaveStyleRule(
      "margin-bottom",
      themeSpacing(3)({ theme: ascDefaultTheme })
    );
  });
});
