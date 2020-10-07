import React from "react";
import { MemoryRouter } from "react-router-dom";

import Context from "../../__mocks__/context";
import matchMedia from "../../__mocks__/matchMedia";
import { findTopicBySlug } from "../../utils";
import { render } from "../../utils/test-utils";
import DefaultLayout from "./DefaultLayout";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({}),
}));

const topicMock = "dakraam-plaatsen";
const topicUrlMock = `/${topicMock}`;
const topic = findTopicBySlug(topicMock);

const Wrapper = ({ children, ...otherProps }) => {
  return (
    <Context topicMock={topic}>
      <MemoryRouter initialEntries={[topicUrlMock]}>
        <DefaultLayout {...otherProps}>{children}</DefaultLayout>
      </MemoryRouter>
    </Context>
  );
};

describe("DefaultLayout", () => {
  it("renders with custom heading", () => {
    const { queryByText } = render(
      <Wrapper heading="title">DefaultLayout</Wrapper>
    );
    expect(queryByText("DefaultLayout")).toBeInTheDocument();
    expect(queryByText("title")).toBeInTheDocument();
  });
  it("renders with topic heading", () => {
    const { queryByText } = render(
      <Wrapper topic={topic}>DefaultLayout</Wrapper>
    );
    expect(queryByText("DefaultLayout")).toBeInTheDocument();
    expect(queryByText(topic.text.heading)).toBeInTheDocument();
  });
});
