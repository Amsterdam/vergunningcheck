import { addQuotes, getChecker } from "@vergunningcheck/imtr-client";
import React from "react";

import address from "../__mocks__/address";
import mockedChecker1 from "../__mocks__/checker-dakkapel-plaatsen-mock.json";
import mockedChecker2 from "../__mocks__/checker-without-dataneeds-mock.json";
import { useChecker, useTopicData } from "../hooks";
import nl from "../i18n/nl";
import Topic from "../models/topic";
import { defaultTopicSession } from "../SessionContext";
import { TopicData } from "../types";
import { findTopicBySlug } from "../utils";
import {
  EDIT_BUTTON,
  LOADING_TEXT,
  LOCATION_INPUT,
  LOCATION_SECTION,
  LOCATION_SUMMARY,
  OUTCOME_SECTION,
  OUTCOME_SECTION_CONTENT,
  QUESTION,
  QUESTION_FORM,
  QUESTION_SECTION,
  STEPBYSTEPNAVIGATION,
} from "../utils/test-ids";
import { act, fireEvent, render, screen, waitFor } from "../utils/test-utils";
import CheckerPage from "./CheckerPage";

const topic = findTopicBySlug("dakkapel-plaatsen") as Topic;

const preQuestionText =
  nl.translation.preQuestions[topic.slug].preQuestionMultipleCheckers;
const { text: textQ1 } = mockedChecker1.permits[0].questions[1];
const { text: textQ2 } = mockedChecker1.permits[1].questions[0];
const idQ1 = 1;

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({
    pathname: "/dakkapel-plaatsen",
  }),
}));

jest.mock("../hooks/useTopicData");

jest.mock("../hooks/useChecker");

describe("CheckerPage", () => {
  describe("with data-needs", () => {
    it("renders correctly on first load", async () => {
      // Mock the checker
      (useChecker as any).mockReturnValue({
        checker: getChecker(mockedChecker1),
      });

      // Mock the topicData
      (useTopicData as any).mockReturnValue({
        setTopicData: () => {},
        topicData: defaultTopicSession as TopicData,
      });

      render(<CheckerPage />);

      await waitFor(() => screen.getByTestId(STEPBYSTEPNAVIGATION));

      expect(
        screen.queryByText(nl.translation.location.testing["address input"])
      ).toBeInTheDocument();

      expect(screen.queryByTestId(LOCATION_SECTION)).toBeInTheDocument();
      expect(screen.queryByTestId(LOCATION_INPUT)).toBeInTheDocument();
      expect(screen.queryByTestId(QUESTION_SECTION)).toBeInTheDocument();
      expect(screen.queryByTestId(OUTCOME_SECTION)).toBeInTheDocument();

      expect(screen.queryByTestId(QUESTION)).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(OUTCOME_SECTION_CONTENT)
      ).not.toBeInTheDocument();
    });

    it("renders the pre questions", async () => {
      // Mock the topicData
      (useTopicData as any).mockReturnValue({
        setTopicData: jest.fn(),
        topicData: {
          questionIndex: 0,
          questionMultipleCheckers: true,
          sectionData: [
            { index: 0, isActive: false, isCompleted: true },
            { index: 1, isActive: true, isCompleted: false },
            { index: 2, isActive: false, isCompleted: false },
          ],
          type: mockedChecker1.slug,
        } as any,
      });

      render(<CheckerPage />);

      expect(topic.preQuestionsCount).toEqual(1);

      expect(
        screen.getByText(
          preQuestionText["would you like to build more than one"]
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          preQuestionText["you can do this permit check one at a time"],
          { exact: false }
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          nl.translation.common["at the end you can do another permit check"],
          { exact: false }
        )
      ).toBeInTheDocument();

      expect(screen.getByLabelText(nl.translation.common.yes)).toBeChecked();
    });

    it("renders with predefined address and goes to the Question section", async () => {
      const setTopicDataMock = jest.fn();

      const checker = getChecker(mockedChecker1);
      checker.next();

      // Mock the checker
      (useChecker as any).mockReturnValue({
        checker,
      });

      // Mock the topicData
      (useTopicData as any).mockReturnValue({
        setTopicData: (value: any) => {
          setTopicDataMock(value);
        },
        topicData: {
          address: address[0].result.data.findAddress.exactMatch,
          answers: {},
          questionIndex: 1,
          questionMultipleCheckers: false,
          sectionData: [
            { index: 0, isActive: false, isCompleted: true },
            { index: 1, isActive: true, isCompleted: false },
            { index: 2, isActive: false, isCompleted: false },
          ],
          type: mockedChecker1.slug,
        } as any,
      });

      render(<CheckerPage />);

      // On default render with predefined address
      expect(screen.queryByTestId(LOCATION_INPUT)).not.toBeInTheDocument();
      expect(screen.queryByTestId(LOCATION_SUMMARY)).toBeInTheDocument();
      expect(screen.queryByTestId(QUESTION_SECTION)).toBeInTheDocument();

      expect(screen.queryByText(textQ1)).toBeInTheDocument();
      expect(screen.queryByText(textQ2)).not.toBeInTheDocument();
      expect(screen.getByTestId(`${idQ1}-a1`)).toBeInTheDocument();

      act(() => {
        // Press the answer
        fireEvent.click(screen.getByTestId(`${idQ1}-a1`));
      });
      await act(async () => {
        // Submit the form
        fireEvent.submit(screen.getByTestId(QUESTION_FORM));
      });

      // Validate that the questionIndex will be updated on the CheckerContext
      expect(setTopicDataMock).toBeCalledWith({
        questionIndex: topic.preQuestionsCount + 1,
      });
    });

    it("renders the Outcome section and is able to edit a question", async () => {
      const checker = getChecker(mockedChecker1);
      checker.next();
      const answers = mockedChecker1.permits[1].questions[2]
        .options as string[];
      checker.stack[0].setAnswer(addQuotes(answers[0]));
      checker.next();
      checker.stack[1].setAnswer(false);
      checker.next();

      // Mock the checker
      (useChecker as any).mockReturnValue({
        checker,
      });

      // Mock the topicData
      (useTopicData as any).mockReturnValue({
        setTopicData: () => {},
        topicData: {
          ...defaultTopicSession,
          address: address[0].result.data.findAddress.exactMatch,
          questionIndex: topic?.preQuestionsCount,
          questionMultipleCheckers: false,
          sectionData: [
            { index: 0, isActive: false, isCompleted: true },
            { index: 1, isActive: false, isCompleted: true },
            { index: 2, isActive: true, isCompleted: true },
          ],
          type: mockedChecker1.slug,
        } as any,
      });

      render(<CheckerPage />);

      // On default render with predefined address
      expect(screen.queryByTestId(LOCATION_INPUT)).not.toBeInTheDocument();
      expect(screen.queryByTestId(LOCATION_SUMMARY)).toBeInTheDocument();
      expect(screen.queryAllByTestId(QUESTION).length).toBe(
        2 + topic.preQuestionsCount
      );
      expect(screen.queryByTestId(`${idQ1}-a1`)).not.toBeInTheDocument();

      expect(screen.queryByTestId(OUTCOME_SECTION_CONTENT)).toBeInTheDocument();
      expect(
        screen.queryByText(
          nl.translation.question.alert[
            "this anwser makes it unable to determine the outcome"
          ]
        )
      ).toBeInTheDocument();

      const editButton = screen.queryAllByTestId(EDIT_BUTTON)[0];
      expect(editButton).toBeInTheDocument();

      act(() => {
        // Press the edit button of Q1
        fireEvent.click(editButton);
      });

      // Expect Q1 to be visible with its answers
      expect(screen.queryByTestId(`${idQ1}-a1`)).toBeInTheDocument();
      expect(screen.queryByTestId(`${idQ1}-a2`)).toBeInTheDocument();
      expect(screen.queryByTestId(OUTCOME_SECTION_CONTENT)).toBeInTheDocument();

      act(() => {
        // Press the opposite answer to remove the Outcome
        fireEvent.click(screen.getByTestId(`${idQ1}-a2`));
      });

      expect(
        screen.queryByTestId(OUTCOME_SECTION_CONTENT)
      ).not.toBeInTheDocument();
    });

    it("is loading", async () => {
      // Mock the checker
      (useChecker as any).mockReturnValue({
        checker: undefined,
      });

      // Mock the topicData
      (useTopicData as any).mockReturnValue({
        setTopicData: () => {},
        topicData: {
          ...defaultTopicSession,
          questionMultipleCheckers: false,
        },
      });

      render(<CheckerPage />);

      expect(screen.queryByTestId(LOADING_TEXT)).toBeInTheDocument();

      expect(
        screen.queryByTestId(STEPBYSTEPNAVIGATION)
      ).not.toBeInTheDocument();
    });
  });

  describe("without data-needs", () => {
    it("renders correctly on first load", async () => {
      // Mock the checker
      (useChecker as any).mockReturnValue({
        checker: getChecker(mockedChecker2),
      });

      // Mock the topicData
      (useTopicData as any).mockReturnValue({
        setTopicData: () => {},
        topicData: {
          ...defaultTopicSession,
          type: mockedChecker2.slug,
        } as any,
      });
      render(<CheckerPage />);

      await waitFor(() => screen.getByTestId(STEPBYSTEPNAVIGATION));

      expect(screen.queryByTestId(LOCATION_SECTION)).not.toBeInTheDocument();
      expect(screen.queryByTestId(QUESTION_SECTION)).toBeInTheDocument();
      expect(screen.queryByTestId(QUESTION)).toBeInTheDocument();
      expect(screen.queryByTestId(OUTCOME_SECTION)).toBeInTheDocument();
      expect(
        screen.queryByTestId(OUTCOME_SECTION_CONTENT)
      ).not.toBeInTheDocument();
    });
  });
});
