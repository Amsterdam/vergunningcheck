import React from "react";

import nl from "../i18n/nl";
import { geturl } from "../routes";
import { LOADING_TEXT, NEXT_BUTTON } from "../utils/test-ids";
import { act, fireEvent, render, screen, waitFor } from "../utils/test-utils";
import IntroPage from "./IntroPage";

jest.mock("../routes");

describe("IntroPage", () => {
  it("renders correctly with topic", async () => {
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

    // Render bullets
    expect(
      screen.getByText(nl.translation.introPage.common["monument bullet"])
    ).toBeInTheDocument();

    expect(
      screen.getByText(nl.translation.introPage.dakkapel["placing bullet"])
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

    // Render third paragraph
    expect(
      screen.getByText(nl.translation.introPage.dakkapel["intro description"])
    ).toBeInTheDocument();

    // Render exceptions heading
    expect(
      screen.getByText(nl.translation.introPage.common["exceptions title"])
    ).toBeInTheDocument();

    // Render paragraph
    expect(
      screen.getByText(
        nl.translation.introPage.common["exceptions description"]
      )
    ).toBeInTheDocument();

    // Render bullets
    expect(
      screen.getByText(nl.translation.introPage.dakkapel["exception"], {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        nl.translation.introPage.common["amount of houses exception"]
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        nl.translation.introPage.dakkapel["build without permit exception"]
      )
    ).toBeInTheDocument();

    // Go to next page
    act(() => {
      fireEvent.click(screen.getByTestId(NEXT_BUTTON));
    });
    expect(geturl).toBeCalledTimes(1);
  });
});
