import React from "react";

import nl from "../i18n/nl";
import { geturl } from "../routes";
import { NEXT_BUTTON } from "../utils/test-ids";
import { act, fireEvent, render, screen, waitFor } from "../utils/test-utils";
import IntroPage from "./IntroPage";

jest.mock("../routes");

describe("IntroPage", () => {
  it("renders correctly with topic", async () => {
    render(<IntroPage />);

    await waitFor(() =>
      expect(
        screen.getAllByText("Dakkapel plaatsen", { exact: false })[0]
      ).toBeInTheDocument()
    );

    // wait for first page element to appear
    await waitFor(() =>
      expect(
        screen.getByText(
          nl.translation.introPage.common["check for permit intro"],
          { exact: false }
        )
      ).toBeInTheDocument()
    );

    // render bullets
    expect(
      screen.getByText(nl.translation.introPage.common["monument bullet"], {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(nl.translation.introPage.dakkapel["placing bullet"], {
        exact: false,
      })
    ).toBeInTheDocument();

    // render second paragraph
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

    // render third paragraph
    expect(
      screen.getByText(nl.translation.introPage.dakkapel["intro description"], {
        exact: false,
      })
    ).toBeInTheDocument();

    // render exceptions heading
    expect(
      screen.getByText(nl.translation.introPage.common["exceptions title"], {
        exact: false,
      })
    ).toBeInTheDocument();

    // render paragraph
    expect(
      screen.getByText(
        nl.translation.introPage.common["exceptions description"],
        {
          exact: false,
        }
      )
    ).toBeInTheDocument();

    // render bullets
    expect(
      screen.getByText(nl.translation.introPage.dakkapel["exception"], {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        nl.translation.introPage.common["amount of houses exception"],
        {
          exact: false,
        }
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        nl.translation.introPage.dakkapel["build without permit exception"],
        {
          exact: false,
        }
      )
    ).toBeInTheDocument();

    // Go to next page
    act(() => {
      fireEvent.click(screen.getByTestId(NEXT_BUTTON));
    });
    expect(geturl).toBeCalledTimes(1);
  });
});
