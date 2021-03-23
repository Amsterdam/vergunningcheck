import React from "react";

import { useTopicData } from "../../hooks";
import nl from "../../i18n/nl";
import { defaultTopicSession } from "../../SessionContext";
import { act, fireEvent, render, screen } from "../../utils/test-utils";
import PreQuestions from "./PreQuestions";

const preQuestionsFunctions = {
  isCheckerConclusive: jest.fn(),
  setSkipAnsweredQuestions: jest.fn(),
};

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({
    pathname: "/dakkapel-plaatsen",
  }),
}));

jest.mock("../../hooks/useTopicData");

describe("PreQuestions", () => {
  it("are rendered and handle submit", async () => {
    const setTopicDataMock = jest.fn();

    (useTopicData as any).mockReturnValue({
      setTopicData: (value: any) => {
        setTopicDataMock(value);
      },
      topicData: {
        ...defaultTopicSession,
        questionIndex: 0,
        questionMultipleCheckers: true,
        sectionData: [
          { index: 0, isActive: false, isCompleted: true },
          { index: 1, isActive: true, isCompleted: false },
          { index: 2, isActive: false, isCompleted: false },
        ],
      },
    });

    render(
      <PreQuestions
        isSectionActive
        questionIndex={0}
        {...preQuestionsFunctions}
      />
    );

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText(nl.translation.common.yes)).toBeChecked();

    // Click the answer
    act(() => {
      fireEvent.click(screen.getByLabelText(nl.translation.common.no));
    });
    expect(setTopicDataMock).toBeCalledWith({
      questionMultipleCheckers: false,
    });

    await act(async () => {
      // Submit the form
      fireEvent.submit(screen.getByRole("form"));
    });

    expect(setTopicDataMock).toBeCalledWith({
      questionIndex: 1, // = topic.preQuestionsCount
    });
  });
});
