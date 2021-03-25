import React, { FunctionComponent } from "react";

import { PreQuestionComponent } from "../../config";
import { useTopic, useTopicData } from "../../hooks";
import { Answer } from "../../types";
import PreQuestionAreYouSure from "./PreQuestionAreYouSure";
import PreQuestionMultipleCheckers from "./PreQuestionMultipleCheckers";

type PreQuestionsProps = {
  editQuestionHook?: any;
  isCheckerConclusive: () => boolean;
  isSectionActive: boolean;
  questionIndex: number;
  setSkipAnsweredQuestions: (val: boolean) => void;
};

const PreQuestions: FunctionComponent<PreQuestionsProps> = ({
  editQuestionHook,
  isCheckerConclusive,
  isSectionActive,
  questionIndex,
  setSkipAnsweredQuestions,
}) => {
  const { preQuestions } = useTopic();
  const { setTopicData } = useTopicData();

  const goToNextQuestion = () => {
    setTopicData({
      questionIndex: questionIndex + 1,
    });
    setSkipAnsweredQuestions(true);
  };

  const editQuestion = (index: number) => {
    editQuestionHook && editQuestionHook();

    setTopicData({
      questionIndex: index,
    });
  };

  const saveAnswer = (answer: Answer, topicDataKey: string) => {
    // This sets the answer.value in the `topicData`
    setTopicData({
      [topicDataKey]: answer.value,
    });
  };

  const preQuestionsProps = {
    ...{
      editQuestion,
      goToNextQuestion,
      isCheckerConclusive,
      isSectionActive,
      questionIndex,
      saveAnswer,
      setSkipAnsweredQuestions,
    },
  };

  return preQuestions ? (
    <>
      {preQuestions.map((preQuestion, index) => {
        switch (preQuestion) {
          case PreQuestionComponent.MULTIPLE_CHECKERS:
            return (
              <PreQuestionMultipleCheckers
                key={index}
                index={index}
                {...preQuestionsProps}
              />
            );
          case PreQuestionComponent.ARE_YOU_SURE:
            return (
              <PreQuestionAreYouSure
                key={index}
                index={index}
                {...preQuestionsProps}
              />
            );
          default:
            throw new Error(
              `The preQuestion on index "${index}" is not supported yet.`
            );
        }
      })}
    </>
  ) : null;
};

export default PreQuestions;
