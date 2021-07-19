import * as imtr from "@vergunningcheck/imtr-client";
import React from "react";

import mockedChecker1 from "../../__mocks__/checker-dakkapel-plaatsen-mock.json";
import { useChecker, useTopicData } from "../../hooks";
import { defaultTopicSession } from "../../SessionContext";
import { SectionFunctions } from "../../types";
import { EDIT_BUTTON, PREV_BUTTON, QUESTION_FORM } from "../../utils/test-ids";
import { act, fireEvent, render, screen } from "../../utils/test-utils";
import Questions from "./Questions";

const sectionFunctions: SectionFunctions = {
  changeActiveSection: () => jest.fn(),
  completeSection: jest.fn(),
  getNextSection: jest.fn(),
  goToNextSection: jest.fn(),
};
const setTopicDataMock = jest.fn();

const mockTopicSession = {
  ...defaultTopicSession,
  questionMultipleCheckers: true,
  sectionData: [
    { index: 0, isActive: false, isCompleted: true },
    { index: 1, isActive: true, isCompleted: false },
    { index: 2, isActive: false, isCompleted: false },
  ],
};

const { id: idQ1, options: optionsQ1 } = mockedChecker1.permits[0].questions[1];
const optionsQ1a = optionsQ1 ? optionsQ1[0] : "";
const optionsQ1b = optionsQ1 ? optionsQ1[1] : "";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({
    pathname: "/dakkapel-plaatsen",
  }),
}));

jest.mock("../../hooks/useChecker");
jest.mock("../../hooks/useTopicData");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Questions", () => {
  it("handle undefined checker", async () => {
    // Mock the checker
    (useChecker as any).mockReturnValue({
      checker: undefined,
    });

    (useTopicData as any).mockReturnValue({
      setTopicData: (value: any) => {
        setTopicDataMock(value);
      },
      topicData: {
        ...mockTopicSession,
      },
    });

    render(<Questions isActive sectionFunctions={sectionFunctions} />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("can handle prev/next buttons", async () => {
    const checker = imtr.getChecker(mockedChecker1);
    checker.next();

    // Mock the checker
    (useChecker as any).mockReturnValue({
      checker,
    });

    (useTopicData as any).mockReturnValue({
      setTopicData: (value: any) => {
        setTopicDataMock(value);
      },
      topicData: {
        ...mockTopicSession,
        questionIndex: 1,
      },
    });

    render(<Questions isActive sectionFunctions={sectionFunctions} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByTestId(`q1-a1`)).toBeInTheDocument();
    expect(screen.getByTestId(PREV_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId(EDIT_BUTTON)).toBeInTheDocument();

    // Click the prev button
    act(() => {
      fireEvent.click(screen.getByTestId(PREV_BUTTON));
    });
    expect(setTopicDataMock).toBeCalledWith({
      questionIndex: 0,
    });

    // Submit the form
    act(() => {
      // Press the answer
      fireEvent.click(screen.getByTestId(`q1-a1`));
    });
    await act(async () => {
      // Submit the form
      fireEvent.submit(screen.getByTestId(QUESTION_FORM));
    });

    // Validate that the answers object on the context/local storage
    expect(setTopicDataMock).toBeCalledWith({
      answers: {
        [idQ1]: imtr.addQuotes(optionsQ1a),
      },
    });
  });

  it("can handle the edit button", async () => {
    const checker = imtr.getChecker(mockedChecker1);
    const next = checker.next() as imtr.Question;
    next.setAnswer(imtr.addQuotes(optionsQ1b));
    checker.next();

    // Mock the checker
    (useChecker as any).mockReturnValue({
      checker,
    });

    (useTopicData as any).mockReturnValue({
      setTopicData: (value: any) => {
        setTopicDataMock(value);
      },
      topicData: {
        ...mockTopicSession,
        questionIndex: 2,
      },
    });

    const editQuestionHook = jest.fn();

    render(
      <Questions
        editQuestionHook={editQuestionHook}
        isActive
        sectionFunctions={sectionFunctions}
      />
    );

    expect(screen.queryByTestId(`q1-a1`)).not.toBeInTheDocument();
    expect(screen.getByTestId(`q2-a1`)).toBeInTheDocument();

    expect(screen.getByTestId(PREV_BUTTON)).toBeInTheDocument();
    expect(screen.getAllByTestId(EDIT_BUTTON)[1]).toBeInTheDocument();

    // Edit the first IMTR question (not the prequestion)
    act(() => {
      fireEvent.click(screen.getAllByTestId(EDIT_BUTTON)[1]);
    });

    expect(setTopicDataMock).toBeCalledWith({
      questionIndex: 1,
    });
    expect(editQuestionHook).toBeCalled();
  });

  it("can go to the next section", async () => {
    const checker = imtr.getChecker(mockedChecker1);
    const q1 = checker.next() as imtr.Question;
    q1.setAnswer(imtr.addQuotes(optionsQ1a));
    const q2 = checker.next() as imtr.Question;
    q2.setAnswer(true);

    // Mock the checker
    (useChecker as any).mockReturnValue({
      checker,
    });

    (useTopicData as any).mockReturnValue({
      setTopicData: (value: any) => {
        setTopicDataMock(value);
      },
      topicData: {
        ...mockTopicSession,
        questionIndex: 2,
      },
    });

    render(<Questions isActive sectionFunctions={sectionFunctions} />);

    // Submit the form
    act(() => {
      // Press the answer
      fireEvent.click(screen.getByTestId(`q2-a1`));
    });
    await act(async () => {
      // Submit the form
      fireEvent.submit(screen.getByTestId(QUESTION_FORM));
    });

    expect(sectionFunctions.goToNextSection).toBeCalled();
  });
});
