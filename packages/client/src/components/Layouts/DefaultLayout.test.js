import React from "react";
import { MemoryRouter } from "react-router-dom";

import matchMedia from "../../__mocks__/matchMedia";
import { findTopicBySlug } from "../../utils";
import { render, screen } from "../../utils/test-utils";
import DefaultLayout from "./DefaultLayout";

Object.defineProperty(window, "matchMedia", matchMedia);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ slug: "dakraam-plaatsen" }),
}));

const topicMock = "dakraam-plaatsen";
const topicUrlMock = `/${topicMock}`;
const topic = findTopicBySlug(topicMock);

const Wrapper = ({ children, ...otherProps }) => {
  return (
    <MemoryRouter initialEntries={[topicUrlMock]}>
      <DefaultLayout {...otherProps}>{children}</DefaultLayout>
    </MemoryRouter>
  );
};

describe("DefaultLayout in STTR flow", () => {
  beforeEach(() => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ slug: "dakraam-plaatsen" }),
    }));
  });

  it("renders with topic titles", () => {
    render(
      <Wrapper heading="heading" formTitle="formTitle">
        DefaultLayout
      </Wrapper>
    );
    expect(screen.queryByText("DefaultLayout")).toBeInTheDocument();
    expect(screen.queryByText("formTitle")).toBeInTheDocument();
    expect(screen.queryByText(topic.name)).toBeInTheDocument();

    // For now the heading should NOT render, because the "slug" is "dakraam-plaatsen"
    expect(screen.queryByText("heading")).not.toBeInTheDocument();
  });
});
