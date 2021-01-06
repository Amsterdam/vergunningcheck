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

  const { isActive } = currentSection;

  const updateQuestionHook = () => {
    // Mark current and next section as incomplete
    complete(false);
    complete(false, getNextSection());
  };

  const goToQuestionHook = () => {
    // Activate the Question Section in case another section is active
    if (!isActive) {
      activate(currentSection);
    }
  };

  return (
    <Questions
      {...{
        complete,
        goToNextSection,
        goToPrevSection,
        goToQuestionHook,
        isActive,
        updateQuestionHook,
      }}
    />
  );
};

export default QuestionSection;
