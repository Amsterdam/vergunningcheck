import "@testing-library/jest-dom/extend-expect";

import { createMemoryHistory } from "history";
import React, { Suspense } from "react";

import Context from "../__mocks__/context";
import Router from "../components/Router";
import { requiredFieldText, topics } from "../config";
import { getslug } from "../routes";
import getChecker from "../sttr_client";
import {
  ADDRESS_PAGE,
  CONCLUSION_PAGE,
  NEXT_BUTTON,
  PREV_BUTTON,
  QUESTION_ANSWERS,
  QUESTION_PAGE,
  RESULTS_PAGE,
} from "../utils/test-ids";
import { act, cleanup, fireEvent, render } from "../utils/test-utils";
import address from "./__mocks__/address";
import debugChecker from "./__mocks__/checker";
import QuestionsPage from "./QuestionsPage";

afterEach(cleanup);

describe("<QuestionsPage />", () => {
  window.scrollTo = jest.fn();

  // Mock topic
  const topicMock = "test-outcomes";
  const topic = topics.find((t) => t.slug === topicMock);

  // Mock checker
  const checker = getChecker(debugChecker);
  checker.next();

  // Mock URL
  const { text, options } = checker.stack[0];
  const slug = getslug(text);
  const baseUrl = `/${topicMock}`;
  window.history.pushState({}, "questions", `${baseUrl}/vragen/`);

  // Mock address
  const { exactMatch } = address[0].result.data.findAddress;

  const Wrapper = () => {
    const history = createMemoryHistory();
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Context topicMock={topic} addressMock={exactMatch} checker={checker}>
          <Router history={history}>
            <QuestionsPage topic={topic} checker={checker} />
          </Router>
        </Context>
      </Suspense>
    );
  };

  xit("renders correctly on first load", async () => {
    const { container, getByText, getByTestId, queryByTestId } = render(
      <Wrapper />
    );

    expect(container).toBeInTheDocument();
    expect(window.location.pathname).toBe(`${baseUrl}/vragen/${slug}`);

    // Wait for question to load
    await queryByTestId(QUESTION_PAGE);

    // Expect to find the question text
    expect(getByText(text)).toBeInTheDocument();

    // Expect to find the answers
    const answers = getByTestId(QUESTION_ANSWERS);
    expect(answers).toBeInTheDocument();
    options.forEach((o) =>
      // Same replace method used in Answers.js
      expect(getByText(o.replace(/['"]+/g, ""))).toBeInTheDocument()
    );
  });

  xit("navigates correctly between Question Page, Conclusion Page and Address Page", async () => {
    const { container, getByTestId, queryByText, queryByTestId } = render(
      <Wrapper />
    );

    // Click `NEXT_BUTTON` and expect form validation to display `requiredFieldText`
    await act(async () => {
      fireEvent.click(getByTestId(NEXT_BUTTON));
    });
    await queryByText(requiredFieldText);

    // Click the FIRST `input` and go to the Conclusion Page
    await act(async () => {
      fireEvent.click(container.querySelectorAll('input[type="radio"]')[0]);
      fireEvent.click(getByTestId(NEXT_BUTTON));
    });
    await queryByTestId(CONCLUSION_PAGE);
    expect(window.location.pathname).toBe(`${baseUrl}/conclusie`);

    // Go back to the Question Page
    await act(async () => {
      fireEvent.click(getByTestId(PREV_BUTTON));
    });
    await queryByTestId(QUESTION_PAGE);

    // Click the FIRST `input` and go to the Conclusion Page
    await act(async () => {
      fireEvent.click(container.querySelectorAll('input[type="radio"]')[0]);
      fireEvent.click(getByTestId(NEXT_BUTTON));
    });
    await queryByTestId(CONCLUSION_PAGE);

    // Go back to the Question Page
    await act(async () => {
      fireEvent.click(getByTestId(PREV_BUTTON));
    });
    await queryByTestId(QUESTION_PAGE);

    // Go even more back to the Address Page
    await act(async () => {
      fireEvent.click(getByTestId(PREV_BUTTON));
    });
    await queryByTestId(ADDRESS_PAGE);
    expect(window.location.pathname).toBe(`${baseUrl}/adresgegevens`);

    // Return to the Question Page
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await queryByTestId(QUESTION_PAGE);
  });

  xit("navigates correctly between different questions and Results Page", async () => {
    const { container, getByTestId, getByText, queryByTestId } = render(
      <Wrapper />
    );

    // Click the THIRD `input` and go to the next question
    await act(async () => {
      fireEvent.click(container.querySelectorAll('input[type="radio"]')[2]);
      fireEvent.click(getByTestId(NEXT_BUTTON));
    });
    await getByText(`Question 2`);
    expect(window.scrollTo).toBeCalledWith(0, 0);

    // Click `NEXT_BUTTON` and expect form validation to display `requiredFieldText`
    await act(async () => {
      fireEvent.click(getByTestId(NEXT_BUTTON));
    });
    await getByText(requiredFieldText);

    // Click and go to the Results Page
    await act(async () => {
      fireEvent.click(container.querySelectorAll('input[type="radio"]')[0]);
      fireEvent.click(getByTestId(NEXT_BUTTON));
    });
    await queryByTestId(RESULTS_PAGE);
    expect(window.location.pathname).toBe(`${baseUrl}/uitkomsten`);

    // Go back to the Question Page
    fireEvent.click(getByTestId(PREV_BUTTON));
    await queryByTestId(QUESTION_PAGE);

    fireEvent.click(getByTestId(PREV_BUTTON));
    await queryByTestId(QUESTION_PAGE);
  });
});
