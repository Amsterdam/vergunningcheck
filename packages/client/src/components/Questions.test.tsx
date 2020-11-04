import "@testing-library/jest-dom/extend-expect";

import getChecker from "@vergunningcheck/imtr-client";
import React from "react";

import Context from "../__mocks__/context";
import { findTopicBySlug } from "../utils/index";
import { act, fireEvent, render, screen } from "../utils/test-utils";
import checkerMock from "./checkerMock.json"; // @TODO: replace with a mocking one
import Questions from "./Questions";

const setAddress = jest.fn();
const matomoTrackEvent = jest.fn();
const goToQuestion = jest.fn();
const isFinished = jest.fn();
const setActiveState = jest.fn();
const setFinishedState = jest.fn();

const mockedFunctions = {
  ...{
    goToQuestion,
    isFinished,
    matomoTrackEvent,
    setActiveState,
    setAddress,
    setFinishedState,
  },
};

jest.mock("react-router-dom", () => ({
  useParams: () => ({}),
}));

// @TODO: Import from i18n
const editQuestionText = "Wijzig";
const nextQuestionText = "Volgende vraag";
const prevQuestionText = "Vorige";
const question1 = checkerMock.permits[1].questions[0];
const question2 = checkerMock.permits[1].questions[1];

describe("Questions", () => {
  const checker = getChecker(checkerMock);
  checker.next();
  const topic = findTopicBySlug("dakkapel-plaatsen");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Wrapper = (props) => {
    const { answers = null, questionIndex = 0 } = props;

    return (
      <Context
        answers={answers}
        questionIndex={questionIndex}
        topicMock={topic}
      >
        <Questions
          checker={checker}
          sessionAddress={{}}
          topic={topic}
          {...props}
          {...mockedFunctions}
        />
      </Context>
    );
  };

  it("should render question 1 correctly", async () => {
    render(<Wrapper isActive={() => true} />);

    // Find only Q1 title
    expect(screen.queryByText(question1.text)).toBeInTheDocument();
    expect(screen.queryByText(question2.text)).not.toBeInTheDocument();

    // Q1 is a boolean question
    expect(screen.queryByText("Ja")).toBeInTheDocument();
    expect(screen.queryByText("Nee")).toBeInTheDocument();

    // Edit, Next & Prev buttons
    const editQuestion = screen.queryByText(editQuestionText);
    const nextQuestion = screen.queryByText(nextQuestionText);
    const prevQuestion = screen.queryByText(prevQuestionText);
    expect(nextQuestion).toBeInTheDocument();
    expect(prevQuestion).not.toBeInTheDocument();
    expect(editQuestion).not.toBeInTheDocument();

    // Expect to go to Q2
    expect(goToQuestion).not.toBeCalled();
    await act(async () => {
      fireEvent.click(screen.queryByText("Ja"));
      fireEvent.click(nextQuestion);
    });
    expect(goToQuestion).toBeCalledWith("next");
  });

  it("should render question 2 correctly", async () => {
    render(
      <Wrapper
        answers={{
          "uitv_5cd6194f-5607-444e-8ed1-d44c6aabde7f": `"Ik ga een nieuwe dakkapel plaatsen op een plek waar er eerst geen was."`,
        }}
        isActive={() => true}
        questionIndex={1}
      />
    );

    // Find both Q1 and Q2 titles
    expect(screen.queryByText(question1.text)).toBeInTheDocument();
    expect(screen.queryByText(question2.text)).toBeInTheDocument();

    // Q2 is a list question
    const answer1 = screen.queryByText(question2.options[0]);
    const answer2 = screen.queryByText(question2.options[1]);
    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();

    // Edit, Next & Prev buttons
    const editQuestion = screen.queryByText(editQuestionText);
    const nextQuestion = screen.queryByText(nextQuestionText);
    const prevQuestion = screen.queryByText(prevQuestionText);
    expect(editQuestion).toBeInTheDocument();
    expect(prevQuestion).toBeInTheDocument();

    // Expect to go to Q3
    expect(goToQuestion).not.toBeCalled();
    await act(async () => {
      fireEvent.click(answer1);
      fireEvent.click(nextQuestion);
    });
    expect(goToQuestion).toBeCalledWith("next");

    // Expect to go back to Q1 with Edit
    await act(async () => {
      fireEvent.click(editQuestion);
    });
    expect(goToQuestion).toBeCalledWith(0);

    // Expect to go back to Q1 with Prev
    await act(async () => {
      fireEvent.click(prevQuestion);
    });
    expect(goToQuestion).toBeCalledWith("prev");
  });

  /**
   *
   * This test can be improved by testing:
   * - goToConclusion()
   * - setContactConclusion()
   * - going in a different route, eg Q1>Q2>Q4>Conclusion>Q1>Q2>Q3>Q4>Q5>Conclusion
   *
   * */
});
