import { getChecker } from "@vergunningcheck/imtr-client";
import React from "react";

import checkerMock from "../../public/imtr/transformed/dakkapel-plaatsen.json";
import address from "../__mocks__/address";
import { useChecker, useTopicData } from "../hooks";
import { defaultTopicSession } from "../SessionContext";
import { TopicData } from "../types";
import { STEPBYSTEPNAVIGATION } from "../utils/test-ids";
import { render, screen, waitFor } from "../utils/test-utils";
import CheckerPage from "./CheckerPage";

// Mock the slug
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({
    pathname: "/dakkapel-plaatsen",
  }),
}));

jest.mock("../hooks/useTopicData");
(useTopicData as any).mockReturnValue({
  setTopicData: () => {},
  topicData: defaultTopicSession as TopicData,
});

// Mock the checker
jest.mock("../hooks/useChecker");
(useChecker as any).mockReturnValue({
  // @TODO: replace checkerMock with static mockfile
  checker: getChecker(checkerMock) as any,
});

describe("CheckerPage", () => {
  it("renders correctly on first load", async () => {
    render(<CheckerPage />);

    expect(screen.queryByText("Dakkapel plaatsen")).toBeInTheDocument();

    await waitFor(() => screen.getByTestId(STEPBYSTEPNAVIGATION));
  });

  it("renders correctly with predefined topicData", async () => {
    // Mock the topicData
    (useTopicData as any).mockReturnValue({
      setTopicData: () => {},
      // @TODO: move topicData to mocks file to be able to reuse
      topicData: {
        address: address[0].result.data.findAddress.exactMatch,
        answers: {
          "uitv_5cd6194f-5607-444e-8ed1-d44c6aabde7f":
            '"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was."',
          "uitv__51fe2afb-ebfa-48e0-b81d-822c38eaf87a": false,
        },
        questionIndex: 1,
        sectionData: [
          { index: 0, isActive: false, isCompleted: true },
          { index: 1, isActive: false, isCompleted: true },
          { index: 2, isActive: true, isCompleted: true },
        ],
        type: "dakkapel-plaatsen",
      } as any,
    });

    render(<CheckerPage />);

    await waitFor(() => screen.getByTestId(STEPBYSTEPNAVIGATION));

    // @Todo: translate
    await waitFor(() => screen.queryByText("Neem contact op met de gemeente"));
  });
});

// @TODO: extend this test with a checker without dataNeeds
