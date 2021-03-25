import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { useTopicData } from "../../hooks";
import { PreQuestionFunctions } from "../../types";
import { QUESTION } from "../../utils/test-ids";
import { StepByStepItem } from "../StepByStepNavigation";
import PreQuestion from "./PreQuestion";
import QuestionAnswer from "./QuestionAnswer";

const topicDataKey = "questionAreYouSure"; // This is the key defined in `TopicData` in `packages/client/src/types.ts`

type QuestionComponentProps = {
  index: number;
  isSectionActive: boolean;
  questionIndex: number;
};

const PreQuestionAreYouSure: FunctionComponent<
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
  const questionId = "preQuestionAreYouSure"; // This is also the key in the translation file (/i18n/nl.ts)
  const heading = t(`preQuestions.${questionId}.are you sure`);
  const description = "";
  const questionAlert = [
    {
      text: t(`preQuestions.${questionId}.then its fine`),
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

export default PreQuestionAreYouSure;
