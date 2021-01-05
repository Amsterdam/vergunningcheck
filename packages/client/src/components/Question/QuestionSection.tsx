import { captureException } from "@sentry/browser";
import React, { FunctionComponent } from "react";

import { useChecker, useTopicData } from "../../hooks";
import { SectionProps } from "../../pages/CheckerPage3";
import { GoToQuestionProp, Questions } from "./";

const QuestionSection: FunctionComponent<SectionProps> = (props) => {
  const { checker } = useChecker();
  const { topicData, setTopicData } = useTopicData();

  const {
    currentSection,
    sectionFunctions: { activate, complete, goToNextSection, goToPrevSection },
  } = props;

  const { isActive, isCompleted } = currentSection;

  const { questionIndex = 0 } = topicData || {};

  if (!checker) {
    return null;
  }

  /**
   * Set the questionIndex the next questionId, previous questionId, or the given id.
   */
  // @TODO: move to Questions file
  const goToQuestion = (value: GoToQuestionProp) => {
    // let action, eventName;
    let newQuestionIndex: number;

    if (value === "next" || value === "prev") {
      // Either go 1 question next or prev
      newQuestionIndex =
        value === "next" ? questionIndex + 1 : questionIndex - 1;

      if (!checker.stack[newQuestionIndex]) {
        captureException(
          `Go to question, question with index: ${newQuestionIndex} not found on stack`
        );
        return;
      }

      // Matomo event props
      // action = checker.stack[questionIndex].text;
      // eventName =
      //   value === "next"
      //     ? eventNames.GOTO_NEXT_QUESTION
      //     : eventNames.GOTO_PREV_QUESTION;
    } else {
      // Edit specific question index (value), go directly to this new question index
      newQuestionIndex = value;

      if (!checker.stack[newQuestionIndex]) {
        captureException(
          `Go to question, question with index: ${newQuestionIndex} not found on stack`
        );
        return;
      }

      // Matomo event props
      // action = actions.EDIT_QUESTION;
      // eventName = (checker.stack[newQuestionIndex] as any).text;
    }

    // matomoTrackEvent({
    //   action,
    //   name: eventName,
    // });

    setTopicData({
      questionIndex: newQuestionIndex,
    });
  };

  const activateQuestionSection = () => activate(currentSection);

  return (
    <Questions
      {...{
        activate,
        activateQuestionSection,
        complete,
        goToQuestion,
        goToNextSection,
        goToPrevSection,
        isActive,
        isCompleted,
      }}
    />
  );
};

export default QuestionSection;
