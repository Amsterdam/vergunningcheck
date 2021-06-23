import React from "react";

import {testTopic } from "../../utils/test-utils";
import { render, screen } from "../../utils/test-utils";
import TopicLayout from "./TopicLayout";

describe("TopicLayout", () => {
  it("renders with text", () => {
    render(
      <TopicLayout heading="heading" formTitle="formTitle">
        TopicLayout
      </TopicLayout>
    );
    expect(screen.queryByText("TopicLayout")).toBeInTheDocument();
    expect(screen.queryByText("formTitle")).toBeInTheDocument();
    expect(screen.queryByText(testTopic.name)).toBeInTheDocument();

    // For now the heading should NOT render, because the "slug" is "dakraam-plaatsen"
    expect(screen.queryByText("heading")).not.toBeInTheDocument();
  });
});
