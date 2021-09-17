import React from "react";

import Topic from "../../models/topic";
import { findTopicBySlug } from "../../utils";
import { render, screen } from "../../utils/test-utils";
import TopicLayout from "./TopicLayout";

const topic = findTopicBySlug("dakraam-plaatsen") as Topic;

describe("TopicLayout", () => {
  it("renders with text", () => {
    render(
      <TopicLayout heading="heading" formTitle="formTitle">
        TopicLayout
      </TopicLayout>
    );
    expect(screen.queryByText("TopicLayout")).toBeInTheDocument();
    expect(screen.queryByText("formTitle")).toBeInTheDocument();
    expect(screen.queryByText(topic.name)).toBeInTheDocument();

    // For now the heading should NOT render, because the "slug" is "dakraam-plaatsen"
    expect(screen.queryByText("heading")).not.toBeInTheDocument();
  });
});
