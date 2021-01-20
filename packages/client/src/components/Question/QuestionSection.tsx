import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { actions, sections } from "../../config/matomo";
import { useChecker, useSlug, useTopicData, useTracking } from "../../hooks";
import { SectionComponent } from "../../types";
import getOutcomeContent from "../../utils/getOutcomeContent";
import { StepByStepItem } from "../StepByStepNavigation";
import { Questions } from "./";

const QuestionSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const slug = useSlug();
  const { topicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const { address, questionIndex } = topicData;
  const { currentSection, sectionFunctions } = props;

  const { isActive, isCompleted } = currentSection;
  const { activateSection, completeSection, getNextSection } = sectionFunctions;

  const hideQuestionSection = !!(
    address &&
    !checker?._getUpcomingQuestions().length &&
    !checker?.stack.length &&
    checker?.isConclusive() &&
    !isCompleted &&
    questionIndex === 0
  );

  useEffect(() => {
    // In case there are no questions to render but this section is active, go to the Outcome Section
    if (checker && checker.isConclusive() && hideQuestionSection && isActive) {
      const nextSection = getNextSection();
      if (nextSection) {
        activateSection(nextSection);
      }

      // TrackEvent for next step
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.OUTCOME,
      });

      const { title } = getOutcomeContent(checker, slug);

      matomoTrackEvent({
        action: actions.THIS_IS_THE_OUTCOME,
        name: title,
      });
    }
    // eslint-disable-next-line
  }, [checker, isActive]);

  // Skip the Question Section when it has no questions to render
  if (!checker || hideQuestionSection) {
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

      // TrackEvent for next active step
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
