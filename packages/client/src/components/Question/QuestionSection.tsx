import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { actions, sections } from "../../config/matomo";
import { useChecker, useTracking } from "../../hooks";
import { SectionComponent } from "../../types";
import { StepByStepItem } from "../StepByStepNavigation";
import { Questions } from "./";

const QuestionSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const { currentSection, sectionFunctions } = props;
  const { isActive, isCompleted } = currentSection;
  const { activateSection, completeSection, getNextSection } = sectionFunctions;

  // Skip the Question Section when it has no questions to render
  if (
    !checker ||
    (checker.stack.length === 0 && checker._getUpcomingQuestions().length === 0)
  ) {
    return null;
  }

  // Activate the first question (in case of refresh)
  if (isActive && !isCompleted && checker.stack.length === 0) {
    checker.next();
  }

  const saveAnswerHook = () => {
    // This function is triggered every time an answer is saved

    // Make sure the Outcome content is removed, by marking it incomplete
    completeSection(false);
    completeSection(false, getNextSection());
  };

  const editQuestionHook = () => {
    // This function is triggered every time the Edit button has been pressed

    if (!isActive) {
      // Activate the Question Section in case another section is active
      activateSection(currentSection);

      // TrackEvent for active step
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.QUESTIONS,
      });
    }
  };

  return (
    <>
      <StepByStepItem
        checked={isCompleted}
        customSize
        done={isActive}
        heading={t("question.heading")}
        largeCircle
      />

      <Questions
        {...{
          editQuestionHook,
          isActive,
          saveAnswerHook,
          sectionFunctions,
        }}
      />
    </>
  );
};

export default QuestionSection;
