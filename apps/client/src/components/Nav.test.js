import React from "react";

import { NEXT_BUTTON, PREV_BUTTON } from "../utils/test-ids";
import { fireEvent, render } from "../utils/test-utils";
import Form from "./Form";
import Nav from "./Nav";

it("Nav should render with no props", () => {
  const { queryByTestId } = render(<Nav />);

  expect(queryByTestId(NEXT_BUTTON)).not.toBeInTheDocument();
  expect(queryByTestId(PREV_BUTTON)).not.toBeInTheDocument();
});

it("Nav should render default values", () => {
  const { queryByTestId } = render(<Nav showPrev showNext />);

  expect(queryByTestId(PREV_BUTTON)).toBeInTheDocument();

  const nextButton = queryByTestId(NEXT_BUTTON);
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toHaveStyle("margin-right: 25px");
});

it("Nav should render with prop values and should fire events", () => {
  const onSubmitMock = jest.fn();
  const onPrevClickMock = jest.fn();

  const { getByText } = render(
    <Form onSubmit={onSubmitMock}>
      <Nav
        showPrev
        prevText="Prev"
        onGoToPrev={onPrevClickMock}
        showNext
        nextText="Next"
        formEnds
      />
    </Form>
  );

  const prevButton = getByText("Prev");
  const nextButton = getByText("Next");

  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toHaveStyle("margin-right: 10px");

  fireEvent.click(prevButton);
  expect(onPrevClickMock).toHaveBeenCalledTimes(1);

  fireEvent.click(nextButton);
  expect(onSubmitMock).toHaveBeenCalledTimes(1);
});
