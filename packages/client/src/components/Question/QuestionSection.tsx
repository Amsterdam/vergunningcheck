import React, { FunctionComponent } from "react";

import { SectionComponent } from "../../types";
import { Questions } from "./";

const QuestionSection: FunctionComponent<SectionComponent> = (props) => {
  const { currentSection, sectionFunctions } = props;

  const { activateSection, completeSection, getNextSection } = sectionFunctions;

  const { isActive } = currentSection;

  const saveAnswerHook = () => {
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
        goToQuestionHook,
        isActive,
        saveAnswerHook,
        sectionFunctions,
      }}
    />
  );
};

export default QuestionSection;
