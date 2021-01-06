import React, { FunctionComponent } from "react";

import { SectionComponent } from "../../types";
import { Questions } from "./";

const QuestionSection: FunctionComponent<SectionComponent> = (props) => {
  const {
    currentSection,
    sectionFunctions: {
      activateSection,
      completeSection,
      getNextSection,
      goToNextSection,
      goToPrevSection,
    },
  } = props;

  const { isActive } = currentSection;

  const updateQuestionHook = () => {
    // Mark current and next section as incomplete
    completeSection(false);
    completeSection(false, getNextSection());
  };

  const goToQuestionHook = () => {
    // Activate the Question Section in case another section is active
    if (!isActive) {
      activateSection(currentSection);
    }
  };

  return (
    <Questions
      {...{
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
