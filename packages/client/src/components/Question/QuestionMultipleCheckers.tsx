import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { useSlug, useTopicData } from "../../hooks";
import { StepByStepItem } from "../StepByStepNavigation";
import PreQuestion from "./PreQuestion";
import QuestionAnswer from "./QuestionAnswer";

type QuestionComponentProps = {
  editQuestionHook?: () => {};
  index: number;
  isSectionActive: boolean;
  questionIndex: number;
  setSkipAnsweredQuestions: (val: boolean) => {};
};

const QuestionMultipleCheckers: FunctionComponent<QuestionComponentProps> = ({
  editQuestionHook,
  index,
  isSectionActive,
  questionIndex,
  setSkipAnsweredQuestions,
}) => {
  const slug = useSlug();
  const { setTopicData, topicData } = useTopicData();
  const { t } = useTranslation();

  const { questionMultipleCheckers: answer } = topicData;
  const isQuestionAnswered = answer !== undefined;
  const isCurrentQuestion = index === questionIndex && isSectionActive;

  // Hide unanswered inactive questions
  if (!isQuestionAnswered && !isCurrentQuestion) {
    return null;
  }

  // Question data
  const questionId = "questionMultipleCheckers";
  const heading = t(
    `preQuestions.${slug}.${questionId}.would you like to build more than one`
  );
  const description = "";
  const questionAlert = [
    {
      text: t(
        `preQuestions.${slug}.${questionId}.you can do this permit check one at a time`
      ),
      userAnswer: true, // This is the condition on which to show the QuestionAlert
    },
  ];

  const activeStyle = { marginTop: -1, borderColor: "white" };

  // Get the optional text to display in the QuestionAlert
  const questionAlertText = questionAlert?.find(
    ({ userAnswer }) => userAnswer === answer
  )?.text;

  const handleEditQuestion = (index: number) => {
    editQuestionHook && editQuestionHook();

    setTopicData({
      questionIndex: index,
    });
  };

  return (
    <StepByStepItem
      active={isCurrentQuestion}
      checked={isQuestionAnswered}
      customSize
      data-testid="{QUESTION}"
      highlightActive={isCurrentQuestion}
      style={isCurrentQuestion ? activeStyle : {}}
      {...{ heading }}
    >
      <>
        {isCurrentQuestion ? (
          <PreQuestion
            {...{
              answer,
              description,
              questionAlertText,
              questionId,
              setSkipAnsweredQuestions,
            }}
          />
        ) : (
          <QuestionAnswer
            onClick={() => handleEditQuestion(index)}
            showQuestionAlert={!!questionAlertText}
            {...{ answer, questionAlertText }}
          />
        )}
      </>
    </StepByStepItem>
  );
};

export default QuestionMultipleCheckers;
