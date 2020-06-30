import React from "react";
import { render, fireEvent, cleanup } from "../utils/test-utils";
import Nav from "./Nav";
import Form from "./Form";
import { MemoryRouter } from "react-router-dom";
import Context from "../__mocks__/context";
import { NEXT_BUTTON, PREV_BUTTON } from "../utils/test-ids";
import { topics } from "../config";

const onSubmitMock = jest.fn();
const onPrevClickMock = jest.fn();

afterEach(cleanup);

const Wrapper = ({ children }) => {
  const topicMock = "dakraam-plaatsen";
  const topicUrlMock = `/${topicMock}`;
  const topic = topics.find((t) => t.slug === topicMock);

  return (
    <Context topicMock={topic}>
      <MemoryRouter initialEntries={[topicUrlMock]}>
        <Form onSubmit={onSubmitMock}>{children}</Form>
      </MemoryRouter>
    </Context>
  );
};

it("Nav should render with no props", () => {
  const { queryByTestId } = render(
    <Wrapper>
      <Nav />
    </Wrapper>
  );

  expect(queryByTestId(NEXT_BUTTON)).not.toBeInTheDocument();
  expect(queryByTestId(PREV_BUTTON)).not.toBeInTheDocument();
});

it("Nav should render default values", () => {
  const { queryByTestId } = render(
    <Wrapper>
      <Nav showPrev showNext />
    </Wrapper>
  );

  expect(queryByTestId(PREV_BUTTON)).toBeInTheDocument();

  const nextButton = queryByTestId(NEXT_BUTTON);
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toHaveStyle("margin-right: 25px");
});

it("Nav should render with prop values and should fire events", () => {
  const { getByText } = render(
    <Wrapper>
      <Nav
        showPrev
        prevText="Prev"
        onGoToPrev={onPrevClickMock}
        showNext
        nextText="Next"
        formEnds
      />
    </Wrapper>
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
