import React, { FunctionComponent } from "react";

import { PreQuestionComponent } from "../../config";
import { useTopic, useTopicData } from "../../hooks";
import { Answer } from "../../types";
import PreQuestionMultipleCheckers from "./PreQuestionMultipleCheckers";

type PreQuestionsProps = {
  editQuestionHook?: any;
  isSectionActive: boolean;
  questionIndex: number;
  setSkipAnsweredQuestions: (val: boolean) => void;
};

const PreQuestions: FunctionComponent<PreQuestionsProps> = ({
  editQuestionHook,
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

  const saveAnswer = (answer: Answer) => {
    setTopicData({
      questionMultipleCheckers: answer.value,
    });
  };

  const preQuestionsProps = {
    ...{
      editQuestion,
      goToNextQuestion,
      isSectionActive,
      questionIndex,
      saveAnswer,
      setSkipAnsweredQuestions,
    },
  };

  return preQuestions ? (
    <>
      {preQuestions?.map((preQuestion, index) => {
        if (preQuestion === PreQuestionComponent.MULTIPLE_CHECKERS) {
          return (
            <PreQuestionMultipleCheckers
              key={index}
              index={index}
              {...preQuestionsProps}
            />
          );
        }
        throw new Error(
          `The preQuestion "${preQuestion}" is not supported yet.`
        );
      })}
    </>
  ) : null;
};

export default PreQuestions;
