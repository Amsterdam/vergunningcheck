import React, { FunctionComponent } from "react";

import { actions, sections } from "../../config/matomo";
import { useTracking } from "../../hooks";
import { SectionComponent } from "../../types";
import { Questions } from "./";

const QuestionSection: FunctionComponent<SectionComponent> = (props) => {
  const { matomoTrackEvent } = useTracking();

  const { currentSection, sectionFunctions } = props;
  const { isActive } = currentSection;
  const { activateSection, completeSection, getNextSection } = sectionFunctions;

  const saveAnswerHook = () => {
    // Mark current and next section as incomplete
    completeSection(false);
    completeSection(false, getNextSection());
  };

  const editQuestionHook = () => {
    // Activate the Question Section in case another section is active
    if (!isActive) {
      activateSection(currentSection);

      // TrackEvent for active step
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.QUESTIONS,
      });
    }
  };

  return (
    <Questions
      {...{
        editQuestionHook,
        isActive,
        saveAnswerHook,
        sectionFunctions,
      }}
    />
  );
};

export default QuestionSection;
