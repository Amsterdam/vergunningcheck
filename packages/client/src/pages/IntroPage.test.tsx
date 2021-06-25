import React from "react";

import nl from "../i18n/nl";
import { geturl } from "../routes";
import { LOADING_TEXT, NEXT_BUTTON } from "../utils/test-ids";
import {
  act,
  fireEvent,
  render,
  screen,
  testTopic,
  waitFor,
} from "../utils/test-utils";
import IntroPage from "./IntroPage";

jest.mock("../routes");

jest.mock("../hooks/useTopic", () => () => testTopic);

describe("IntroPage", () => {
  it("renders correctly with configured permit check", async () => {
    render(<IntroPage />);

    // First wait for loading text
    await waitFor(() =>
      expect(screen.queryByTestId(LOADING_TEXT)).toBeInTheDocument()
    );

    // Wait for first page element to appear
    await waitFor(() =>
      expect(
        screen.getByText(
          nl.translation.introPage.common["check for permit intro"],
          { exact: false }
        )
      ).toBeInTheDocument()
    );

    expect(screen.getByText(testTopic?.text.heading)).toBeInTheDocument();

    // Render bullets
    expect(
      screen.getByText(nl.translation.introPage.common["monument bullet"])
    ).toBeInTheDocument();

    // Render second paragraph
    expect(
      screen.getByText(
        nl.translation.introPage.common[
          "situation dependent on both situation and questions"
        ],
        {
          exact: false,
        }
      )
    ).toBeInTheDocument();

    // Render exceptions heading
    expect(
      screen.getByText(nl.translation.introPage.common["exceptions title"])
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        nl.translation.introPage.common["amount of houses exception"]
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(nl.translation.common["do the permit check"])
    ).toBeInTheDocument();

    // Go to next page
    act(() => {
      fireEvent.click(screen.getByTestId(NEXT_BUTTON));
    });
    expect(geturl).toBeCalledTimes(1);
  });
});
