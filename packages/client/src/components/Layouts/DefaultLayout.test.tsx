import React from "react";
import { MemoryRouter } from "react-router-dom";

import matchMedia from "../../__mocks__/matchMedia";
import { Topic } from "../../config";
import { findTopicBySlug } from "../../utils";
import { render, screen } from "../../utils/test-utils";
import DefaultLayout from "./DefaultLayout";

Object.defineProperty(window, "matchMedia", matchMedia);

const topicMock = "dakraam-plaatsen";
const topicUrlMock = `/${topicMock}`;
const topic = findTopicBySlug(topicMock) as Topic;

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => ({ slug: "dakraam-plaatsen" }),
}));

type Props = {
  formTitle: string;
  heading: string;
};

const Wrapper: React.FC<Props> = ({ children, formTitle, heading }) => (
  <MemoryRouter initialEntries={[topicUrlMock]}>
    <DefaultLayout
      {...{
        formTitle,
        heading,
      }}
    >
      {children}
    </DefaultLayout>
  </MemoryRouter>
);

describe("DefaultLayout in STTR flow", () => {
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
