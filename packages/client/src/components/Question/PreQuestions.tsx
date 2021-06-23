import React, { FunctionComponent } from "react";

import { useTopicData } from "../../hooks";
import { Answer, PreQuestionComponent } from "../../types";
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
  // FIXME: const { preQuestions } = useTopic();
  const preQuestions: [] = [];

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
          `The preQuestion on index "${index}" is not supported yet.`
        );
      })}
    </>
  ) : null;
};

export default PreQuestions;
