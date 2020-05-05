import React from "react";
import { render, fireEvent, cleanup, screen } from "../utils/test-utils";
import Nav from "./Nav";
import Form from "./Form";
import { MemoryRouter } from "react-router-dom";
import Context from "../__mocks__/context";

const onSubmitMock = jest.fn();
const onPrevClickMock = jest.fn();

afterEach(cleanup);

const Wrapper = ({ children }) => {
  const topicMock = "dakraam-plaatsen";
  const topicUrlMock = `/${topicMock}`;

  return (
    <Context topicMock={topicMock}>
      <MemoryRouter initialEntries={[topicUrlMock]}>
        <Form onSubmit={onSubmitMock}>{children}</Form>
      </MemoryRouter>
    </Context>
  );
};

it("Nav should render with no props", () => {
  render(
    <Wrapper>
      <Nav />
    </Wrapper>
  );

  expect(screen.findByText("Vorige")).not.toBeFalsy();
  expect(screen.findByText("Volgende")).not.toBeFalsy();
});

it("Nav should render default values", () => {
  render(
    <Wrapper>
      <Nav showPrev showNext />
    </Wrapper>
  );

  expect(screen.getByText("Vorige")).toBeTruthy();
  expect(screen.getByText("Volgende")).toBeTruthy();
  expect(screen.getByText("Volgende")).toHaveStyle("margin-right: 25px");
});

it("Nav should render with prop values and should fire events", () => {
  render(
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

  expect(screen.getByText("Prev")).toBeTruthy();
  expect(screen.getByText("Next")).toBeTruthy();
  expect(screen.getByText("Next")).toHaveStyle("margin-right: 10px");

  fireEvent.click(screen.getByText("Prev"));
  expect(onPrevClickMock).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByText("Next"));
  expect(onSubmitMock).toHaveBeenCalledTimes(1);
});
