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

const Wrapper = ({ children }) => {
  const topicMock = "dakraam-plaatsen";
  const topicUrlMock = `/${topicMock}`;
  const topic = findTopicBySlug(topicMock);

  return (
    <Context topicMock={topic}>
      <MemoryRouter initialEntries={[topicUrlMock]}>
        <DefaultLayout heading="title">{children}</DefaultLayout>
      </MemoryRouter>
    </Context>
  );
};

describe("DefaultLayout", () => {
  it("renders with text", () => {
    const { queryByText } = render(<Wrapper>DefaultLayout</Wrapper>);
    expect(queryByText("DefaultLayout")).toBeInTheDocument();
    expect(queryByText("title")).toBeInTheDocument();
  });
});
