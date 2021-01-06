import React, { FunctionComponent } from "react";

import { SectionProps } from "../../pages/CheckerPage";
import { Questions } from "./";

const QuestionSection: FunctionComponent<SectionProps> = (props) => {
  const {
    currentSection,
    sectionFunctions: {
      activate,
      complete,
      getNextSection,
      goToNextSection,
      goToPrevSection,
    },
  } = props;

  const { isActive, isCompleted } = currentSection;

  const updateQuestionHook = () => {
    if (getNextSection()) {
      complete(false, getNextSection());
    }
  };

  const activateQuestionSection = () => activate(currentSection);

  return (
    <Questions
      {...{
        activateQuestionSection,
        complete,
        goToNextSection,
        goToPrevSection,
        isActive,
        isCompleted,
        updateQuestionHook,
      }}
    />
  );
};

export default QuestionSection;
