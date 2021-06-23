import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { useSlug, useTopicData } from "../../hooks";
import { PreQuestionFunctions } from "../../types";
import { QUESTION } from "../../utils/test-ids";
import { StepByStepItem } from "../StepByStepNavigation";
import PreQuestion from "./PreQuestion";
import QuestionAnswer from "./QuestionAnswer";

const topicDataKey = "questionMultipleCheckers"; // This is the key defined in `TopicData` in `packages/client/src/types.ts`

type QuestionComponentProps = {
  index: number;
  isSectionActive: boolean;
  questionIndex: number;
};

const PreQuestionMultipleCheckers: FunctionComponent<
  QuestionComponentProps & PreQuestionFunctions
> = ({
  editQuestion,
  goToNextQuestion,
  index,
  isCheckerConclusive,
  isSectionActive,
  questionIndex,
  saveAnswer,
}) => {
  const slug = useSlug();
  const { topicData } = useTopicData();
  const { t } = useTranslation();

  const { [topicDataKey]: answer } = topicData;

  const isQuestionAnswered = answer !== undefined;
  const isCurrentQuestion = index === questionIndex && isSectionActive;

  // Hide unanswered inactive questions
  if (!isQuestionAnswered && !isCurrentQuestion) {
    return null;
  }

  // Question data
  const questionId = "preQuestionMultipleCheckers"; // This is also the key in the translation file (/i18n/nl.ts)
  const heading = t(
    `preQuestions.${slug}.${questionId}.would you like to build more than one`
  );
  const description = "";
  const questionAlert = [
    {
      text:
        t(
          `preQuestions.${slug}.${questionId}.you can do this permit check one at a time`
        ) +
        " " +
        t("common.at the end you can do another permit check"),
      userAnswer: true, // This is the condition on which to show the QuestionAlert
    },
  ];

  // Get the optional text to display in the QuestionAlert
  const questionAlertText = questionAlert?.find(
    ({ userAnswer }) => userAnswer === answer
  )?.text;

  return (
    <StepByStepItem
      active={isCurrentQuestion}
      activeStyle={isCurrentQuestion}
      checked={isQuestionAnswered}
      customSize
      data-testid={QUESTION}
      highlightActive={isCurrentQuestion}
      {...{ heading }}
    >
      <>
        {isCurrentQuestion ? (
          // Show the actual question
          <PreQuestion
            {...{
              answer,
              description,
              editQuestion,
              goToNextQuestion,
              isCheckerConclusive,
              questionAlertText,
              questionId,
              saveAnswer,
              topicDataKey,
            }}
          />
        ) : (
          // Show the user answer with an Edit button
          <QuestionAnswer
            onClick={() => editQuestion(index)}
            showQuestionAlert={!!questionAlertText}
            {...{ answer, questionAlertText }}
          />
        )}
      </>
    </StepByStepItem>
  );
};

export default PreQuestionMultipleCheckers;
