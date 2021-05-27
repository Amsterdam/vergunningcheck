import "jest-styled-components";

import React from "react";

import { Form } from "../atoms";
import nl from "../i18n/nl";
import { NEXT_BUTTON, PREV_BUTTON } from "../utils/test-ids";
import { fireEvent, render, screen } from "../utils/test-utils";
import Nav from "./Nav";

describe("Nav", () => {
  it("should render with no props", () => {
    render(<Nav />);

    expect(screen.queryByTestId(NEXT_BUTTON)).not.toBeInTheDocument();
    expect(screen.queryByTestId(PREV_BUTTON)).not.toBeInTheDocument();
  });

  it("should render default values", () => {
    render(<Nav showPrev showNext />);

    expect(screen.queryByTestId(PREV_BUTTON)).toBeInTheDocument();
    expect(
      screen.getByText(nl.translation.common.previous)
    ).toBeInTheDocument();

    const nextButton = screen.queryByTestId(NEXT_BUTTON);
    expect(nextButton).toBeInTheDocument();
    expect(screen.getByText(nl.translation.common.next)).toBeInTheDocument();
    expect(nextButton).toHaveStyleRule("margin-right", "25px");
  });

  it("should render with prop values and should fire events", () => {
    const onSubmitMock = jest.fn();
    const onPrevClickMock = jest.fn();

    render(
      <Form onSubmit={onSubmitMock}>
        <Nav
          formEnds
          nextText="Next"
          onGoToPrev={onPrevClickMock}
          prevText="Prev"
          showNext
          showPrev
        />
      </Form>
    );

    const prevButton = screen.getByText("Prev");
    const nextButton = screen.getByText("Next");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveStyleRule("margin-right", "10px");

    fireEvent.click(prevButton);
    expect(onPrevClickMock).toHaveBeenCalledTimes(1);

    fireEvent.click(nextButton);
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
