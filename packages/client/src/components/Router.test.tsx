import React from "react";

import nl from "../i18n/nl";
import { Topic } from "../types";
import { findTopicBySlug } from "../utils";
import { LOADING_TEXT } from "../utils/test-ids";
import { render, screen, waitFor } from "../utils/test-utils";
import Router from "./Router";

describe("Router", () => {
  it("renders a 404", async () => {
    window.history.pushState({}, "Page Title", "/not-found");

    render(<Router />);

    expect(window.location.pathname).toBe("/not-found");

    // First wait for loading text
    await waitFor(() =>
      expect(screen.queryByTestId(LOADING_TEXT)).toBeInTheDocument()
    );

    // Then find the `notFoundPage` text
    await waitFor(() =>
      expect(
        screen.getByText(nl.translation.notFoundPage.heading)
      ).toBeInTheDocument()
    );

    expect(window.scrollTo).toBeCalled();
  });

  it("renders a topic intro", async () => {
    window.history.pushState({}, "Page Title", "/dakkapel-plaatsen");

    const topic = findTopicBySlug("dakkapel-plaatsen") as Topic;

    render(<Router />);

    await waitFor(() =>
      expect(screen.queryByTestId(LOADING_TEXT)).toBeInTheDocument()
    );

    // Find the topic text
    await waitFor(() =>
      expect(screen.getByText(topic.name)).toBeInTheDocument()
    );

    // Find the intro text
    expect(
      screen.queryByText(
        nl.translation.introPage.common["check for permit intro"],
        { exact: false }
      )
    ).toBeInTheDocument();
  });
});
