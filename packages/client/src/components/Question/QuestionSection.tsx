import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getDataNeed } from "../../config/autofill";
import { actions, sections } from "../../config/matomo";
import { useChecker, useTopicData, useTracking } from "../../hooks";
import { SectionComponent } from "../../types";
import { QUESTION_SECTION } from "../../utils/test-ids";
import { StepByStepItem } from "../StepByStepNavigation";
import { Questions } from "./";

const QuestionSection: FunctionComponent<SectionComponent> = (props) => {
  const { checker } = useChecker();
  const { setTopicData, topicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const { address, questionIndex, timesLoaded } = topicData;
  const { currentSection, sectionFunctions } = props;

  const { isActive, isCompleted } = currentSection;
  const {
    changeActiveSection,
    completeSection,
    getNextSection,
  } = sectionFunctions;

  const hideQuestionSection = !!(
    address &&
    !checker?.getUpcomingQuestions().length &&
    !checker?.stack.length &&
    checker?.isConclusive() &&
    !isCompleted &&
    questionIndex === 0
  );

  useEffect(() => {
    if (timesLoaded === 0 && address) {
      // TrackEvent for active step (only when NewCheckerModal is used with saveAddress)
      // This might need tweaking in case we have configured checkers that can render without questions
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.QUESTIONS,
      });

      setTopicData({
        timesLoaded: 1,
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // In case there are no questions to render but this section is active, go to the Outcome Section
    if (checker && checker.isConclusive() && hideQuestionSection && isActive) {
      const nextSection = getNextSection();
      if (nextSection) {
        changeActiveSection(nextSection);
      }

      // TrackEvent for next step
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.OUTCOME,
      });

      const title = "XXX todo";

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

  const noDataNeedAndEmptyStack =
    !getDataNeed(checker) &&
    isActive &&
    !isCompleted &&
    checker.stack.length === 0;

  // Prevent an empty Question Section when refreshing a checker without getDataNeed (only happens when first question remains unanswered)
  if (noDataNeedAndEmptyStack) {
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
      changeActiveSection(currentSection);

      // TrackEvent for next active step
      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.QUESTIONS,
      });
    }
  };

  const highlightSection = isActive && questionIndex === 0;

  return (
    <>
      <StepByStepItem
        active={highlightSection}
        as="div"
        checked={isCompleted}
        customSize
        data-testid={QUESTION_SECTION}
        done={isActive}
        heading={t("question.heading")}
        highlightActive={highlightSection}
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
