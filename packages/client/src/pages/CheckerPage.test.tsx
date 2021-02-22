import { addQuotes, getChecker } from "@vergunningcheck/imtr-client";
import React from "react";

import address from "../__mocks__/address";
import mockedChecker1 from "../__mocks__/checker-dakkapel-plaatsen-mock.json";
import mockedChecker2 from "../__mocks__/checker-without-dataneeds-mock.json";
import { useChecker, useTopicData } from "../hooks";
import nl from "../i18n/nl";
import { defaultTopicSession } from "../SessionContext";
import { TopicData } from "../types";
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

    it("renders with predefined address and goes to the Question section", async () => {
      const { text: textQ1 } = mockedChecker1.permits[0].questions[1];
      const { text: textQ2 } = mockedChecker1.permits[1].questions[0];
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
          questionIndex: 0,
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
      expect(screen.queryByTestId("q1-a1")).toBeInTheDocument();

      act(() => {
        // Press the answer
        fireEvent.click(screen.getByTestId("q1-a1"));
      });
      await act(async () => {
        // Submit the form
        fireEvent.submit(screen.getByTestId(QUESTION_FORM));
      });

      // Validate that the questionIndex will be updated on the CheckerContext
      expect(setTopicDataMock).toBeCalledWith({ questionIndex: 1 });
    });

    it("renders the Outcome section", async () => {
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
      expect(screen.queryAllByTestId(QUESTION).length).toBe(2);
      expect(screen.queryByTestId("q1-a1")).not.toBeInTheDocument();

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
      expect(screen.queryByTestId("q1-a1")).toBeInTheDocument();
      expect(screen.queryByTestId("q1-a2")).toBeInTheDocument();
      expect(screen.queryByTestId(OUTCOME_SECTION_CONTENT)).toBeInTheDocument();

      act(() => {
        // Press the opposite answer to remove the Outcome
        fireEvent.click(screen.getByTestId("q1-a2"));
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
        topicData: defaultTopicSession,
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
