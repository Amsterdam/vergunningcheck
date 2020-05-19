import React from "react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import Router from "../components/Router";
import { render, fireEvent, cleanup } from "../utils/test-utils";
import Context from "../__mocks__/context";
import address from "./__mocks__/address";
import { getslug } from "../routes";
import { topics, requiredFieldText } from "../config";
import QuestionsPage from "./QuestionsPage";

import {
  QUESTION_PAGE,
  QUESTION_ANSWERS,
  NEXT_BUTTON,
  PREV_BUTTON,
  ADDRESS_PAGE,
  CONCLUSION_PAGE,
  RESULTS_PAGE,
} from "../utils/test-ids";

import debugChecker from "./__mocks__/checker";
import getChecker from "../sttr_client";

afterEach(cleanup);

describe("<QuestionsPage />", () => {
  window.scrollTo = jest.fn();

  // Mock topic
  const topicMock = "test-outcomes";
  const topic = topics.find((t) => t.slug === topicMock);

  // Mock checker
  const checker = getChecker(debugChecker);

  // Mock URL
  const { text, options } = checker.stack[0];
  const slug = getslug(text);
  const baseUrl = `/${topicMock}`;
  window.history.pushState({}, "questions", `${baseUrl}/vragen/`);

  // Mock address
  const { exactMatch } = address[0].result.data.findAddress;

  const Wrapper = ({questionId}) => {
    const history = createMemoryHistory();
    return (
      <Context topicMock={topic} addressMock={exactMatch} checker={checker} questionId={questionId || 0}>
        <Router history={history}>
          <QuestionsPage topic={topic} checker={checker} />
        </Router>
      </Context>
    );
  };

  it("renders correctly on first load", async () => {
    const { container, getByText, getByTestId, findByTestId } = render(
      <Wrapper questionId={0} />
    );

    expect(container).toBeInTheDocument();
    expect(window.location.pathname).toBe(`${baseUrl}/vragen/${slug}`);

    // Wait for question to load
    await findByTestId(QUESTION_PAGE);

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

  it("navigates correctly between Question Page, Conclusion Page and Address Page", async () => {
    const { container, getByTestId, findByText, findByTestId } = render(
      <Wrapper questionId={0} />
    );

    // Click `NEXT_BUTTON` and expect form validation to display `requiredFieldText`
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await findByText(requiredFieldText);

    // Click the FIRST `input` and go to the Conclusion Page
    fireEvent.click(container.querySelectorAll('input[type="radio"]')[0]);
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await findByTestId(CONCLUSION_PAGE);
    expect(window.location.pathname).toBe(`${baseUrl}/conclusie`);

    // Go back to the Question Page
    fireEvent.click(getByTestId(PREV_BUTTON));
    await findByTestId(QUESTION_PAGE);

    // Click the FIRST `input` and go to the Conclusion Page
    fireEvent.click(container.querySelectorAll('input[type="radio"]')[0]);
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await findByTestId(CONCLUSION_PAGE);

    // Go back to the Question Page
    fireEvent.click(getByTestId(PREV_BUTTON));
    await findByTestId(QUESTION_PAGE);

    // Go even more back to the Address Page
    fireEvent.click(getByTestId(PREV_BUTTON));
    await findByTestId(ADDRESS_PAGE);
    expect(window.location.pathname).toBe(`${baseUrl}/adresgegevens`);

    // Return to the Question Page
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await findByTestId(QUESTION_PAGE);
  });

  it("navigates correctly between different questions and Results Page", async () => {
    const { container, getByTestId, findByText, findByTestId } = render(
      <Wrapper questionId={1} />
    );

    // Click the THIRD `input` and go to the next question
    fireEvent.click(container.querySelectorAll('input[type="radio"]')[2]);
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await findByText(`Question 2`);
    expect(window.scrollTo).toBeCalledWith(0, 0);

    // Click `NEXT_BUTTON` and expect form validation to display `requiredFieldText`
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await findByText(requiredFieldText);

    // Click and go to the Results Page
    fireEvent.click(container.querySelectorAll('input[type="radio"]')[0]);
    fireEvent.click(getByTestId(NEXT_BUTTON));
    await findByTestId(RESULTS_PAGE);
    expect(window.location.pathname).toBe(`${baseUrl}/uitkomsten`);

    // Go back to the Question Page
    fireEvent.click(getByTestId(PREV_BUTTON));
    await findByTestId(QUESTION_PAGE);

    fireEvent.click(getByTestId(PREV_BUTTON));
    await findByTestId(QUESTION_PAGE);
  });
});
