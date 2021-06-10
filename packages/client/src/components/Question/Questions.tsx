import { captureException, setTag } from "@sentry/browser";
import * as imtr from "@vergunningcheck/imtr-client";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ScrollAnchor } from "../../atoms";
import { actions, eventNames, sections } from "../../config/matomo";
import {
  useChecker,
  useSlug,
  useTopic,
  useTopicData,
  useTracking,
} from "../../hooks";
import { Answer, SectionFunctions } from "../../types";
import { scrollToRef } from "../../utils";
import getOutcomeContent from "../../utils/getOutcomeContent";
import { QUESTION } from "../../utils/test-ids";
import { StepByStepItem } from "../StepByStepNavigation";
import { Question, QuestionAnswer } from "./";
import PreQuestions from "./PreQuestions";

type QuestionsProps = {
  editQuestionHook?: () => void;
  isActive: boolean;
  saveAnswerHook?: () => void;
  sectionFunctions: SectionFunctions;
};

const Questions: FunctionComponent<QuestionsProps> = ({
  editQuestionHook,
  isActive: isSectionActive,
  saveAnswerHook,
  sectionFunctions,
}) => {
  const { checker } = useChecker();
  const outcomeRef = useRef<any>(null);
  const [skipAnsweredQuestions, setSkipAnsweredQuestions] = useState(false);
  const slug = useSlug();
  const { isPermitCheck, isPermitForm, preQuestionsCount } = useTopic();
  const { topicData, setTopicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();

  const { address, questionIndex } = topicData;
  const { goToNextSection } = sectionFunctions;
  const { GOTO_NEXT_QUESTION, GOTO_PREV_QUESTION, GOTO_OUTCOME } = eventNames;
  const { EDIT_QUESTION } = actions;

  const imtrQuestionIndex = questionIndex - preQuestionsCount;

  // This function handles the user-event of going to a new question
  const goToQuestion = useCallback(
    (index: number, eventType?: string) => {
      if (!checker || !isPermitCheck) return;

      const newImtQuestionIndex = index - preQuestionsCount;

      // Only track in case the question is an IMTR question, and not a PreQuestion
      if (index >= preQuestionsCount) {
        if (!checker.stack[newImtQuestionIndex]) {
          const error = `goToQuestion failed: question with index "${newImtQuestionIndex}" not found on stack`;

          console.error(error);
          captureException(error);
          return;
        }
        const { text } = checker.stack[newImtQuestionIndex];

        // TrackEvent for the current question
        if (
          eventType === GOTO_NEXT_QUESTION ||
          eventType === GOTO_PREV_QUESTION ||
          eventType === GOTO_OUTCOME
        ) {
          matomoTrackEvent({
            action: text,
            name: eventType,
          });
        } else if (eventType === EDIT_QUESTION) {
          matomoTrackEvent({
            action: eventType,
            name: text,
          });
        }

        // TrackEvent for next active question
        if (eventType && eventType !== GOTO_OUTCOME) {
          matomoTrackEvent({
            action: checker.stack[newImtQuestionIndex].text,
            name: eventNames.ACTIVE_QUESTION,
          });
        }
      }

      // Update session with new question to rerender the page
      setTopicData({
        questionIndex: index,
      });
    },

    //eslint-disable-next-line
    [checker?.stack, imtrQuestionIndex]
  );

  const handleNextQuestion = useCallback(
    (isUserEvent = true) => {
      if (!checker) return;

      if (isPermitCheck) {
        const question = checker.stack[imtrQuestionIndex];

        const hasContactOutcome =
          question && checker.questionTriggersContactOutcome(question);

        // Check if this question is already answered before by making sure it's not the last question on the stack
        const isPreviouslyAnsweredQuestion =
          checker.stack.length - 1 !== imtrQuestionIndex;

        // Check if there is a next question to display
        const hasNextQuestion =
          !isPreviouslyAnsweredQuestion && !!checker.next();

        // Handle going to the next question
        if (isPreviouslyAnsweredQuestion || hasNextQuestion) {
          // Determine the eventType for analytics purposes
          const userEvent = isCheckerConclusive()
            ? GOTO_OUTCOME
            : GOTO_NEXT_QUESTION;
          const eventType = isUserEvent ? userEvent : "";

          // Go to the actual question
          goToQuestion(questionIndex + 1, eventType);

          // Optionally skip the next question if already answered
          setSkipAnsweredQuestions(true);
        }

        // In this case we should not display a next question, but go to the outcome section
        if (hasContactOutcome || !hasNextQuestion) {
          goToOutcome(isUserEvent);
        }
      } else {
        // Permit Forms don't need complex validation
        goToNextSection();
      }
    },
    //eslint-disable-next-line
    [checker, questionIndex]
  );

  const handlePrevQuestion = () => {
    // Load the previous question
    goToQuestion(questionIndex - 1, GOTO_PREV_QUESTION);
  };

  const handleEditQuestion = useCallback(
    (index) => {
      editQuestionHook && editQuestionHook();

      // Go to the specific question in the stack
      goToQuestion(index, EDIT_QUESTION);
    },
    //eslint-disable-next-line
    [editQuestionHook]
  );

  const goToOutcome = useCallback(
    (isUserEvent = true) => {
      if (!checker) return;

      goToNextSection();

      // Toggle tracking of the
      if (isUserEvent) {
        matomoTrackEvent({
          action: checker.stack[imtrQuestionIndex].text,
          name: GOTO_OUTCOME,
        });
      }

      matomoTrackEvent({
        action: actions.ACTIVE_STEP,
        name: sections.OUTCOME,
      });

      const { title } = getOutcomeContent(checker, slug);

      matomoTrackEvent({
        action: actions.THIS_IS_THE_OUTCOME,
        name: title,
      });

      // Wrap the function to prevent a miscalculation when the `Question` component collapses
      setImmediate(() => {
        scrollToRef(outcomeRef, 20);
      });
    },
    //eslint-disable-next-line
    [checker, imtrQuestionIndex]
  );

  const isCheckerConclusive = () => {
    // This is placed in a separate function to make other components less dependent on the `useChecker` hook
    return !!checker?.isConclusive();
  };

  useEffect(() => {
    // Make sure that the current question is skipped when it's already answered
    if (checker && skipAnsweredQuestions) {
      // Turn skipping answered questions off
      setSkipAnsweredQuestions(false);

      // Loop through questions
      checker.stack.forEach((q) => {
        const isCurrentQuestion =
          q === checker.stack[imtrQuestionIndex] && isSectionActive;

        // Skip question if already answered
        if (isCurrentQuestion && q.answer !== undefined) {
          handleNextQuestion(false);
        }
      });
    }
    //eslint-disable-next-line
  }, [checker, isSectionActive, imtrQuestionIndex, skipAnsweredQuestions]);

  if (!checker) return null;

  // Show all questions in case of an active Permit Form
  const isActivePermitForm = isPermitForm && address && isSectionActive;

  /**
   *
   * This function handles everything when an answer is updated
   *
   * @param {Answer} answer
   */
  const saveAnswer = (answer: Answer, imtrQuestion?: imtr.Question) => {
    // Save the changed answer to the question
    saveAnswerHook && saveAnswerHook();

    const { label, value } = answer;
    const question = imtrQuestion ?? checker.stack[imtrQuestionIndex];
    const { text } = question;

    // Handle the given answer
    question.setAnswer(value);

    // Store in Sentry
    setTag(text, label);

    matomoTrackEvent({
      action: text,
      name: `${eventNames.ANSWERED_WITH} - ${label}`,
    });

    // Previous answered questions (that aren't decisive anymore) needs to be removed from the stack
    // By rewinding, we're forcing the stack to update
    if (checker.stack.length !== imtrQuestionIndex + 1) {
      checker.rewindTo(imtrQuestionIndex);
    }

    // Store all answers in the session context
    setTopicData({
      answers: checker.getQuestionAnswers(),
    });
  };

  // Toggle this boolean to hide all questions after the decisive contact question
  let hasDecisiveContactQuestion = false;

  return (
    <>
      {/* Loop through Pre Questions */}
      <PreQuestions
        {...{
          editQuestionHook,
          isCheckerConclusive,
          isSectionActive,
          questionIndex,
          setSkipAnsweredQuestions,
          testQuestionIndex: questionIndex,
        }}
      />

      {/* Loop through all IMTR questions */}
      {checker.stack
        .concat(checker.getUpcomingQuestions()) // Merge the stack with upcoming questions to get all questions
        .map((q, i) => {
          const mapIndex = i + preQuestionsCount;

          const { answer } = q;

          // Check if question is the current question from the stack. NB: there is no current question when the section is not active
          const isCurrentQuestion =
            q === checker.stack[imtrQuestionIndex] && isSectionActive;

          // Check if this question is from `checker.stack` or from `checker.getUpcomingQuestions`
          const isQuestionInStack = checker.stack.includes(q);

          // This question is incomplete, because it is unanswered and not the current question
          const isIncompleteQuestion =
            answer === undefined && !isCurrentQuestion;

          // Skip questions in case of a "contact outcome" or the question is incomplete
          const skipThisQuestion =
            hasDecisiveContactQuestion ||
            (isIncompleteQuestion && !isActivePermitForm);

          // For performance improvement it would be better not to re-render the question content so much
          if (skipThisQuestion) {
            return null;
          }

          // Toggle this boolean to hide all questions after the decisive contact question
          hasDecisiveContactQuestion =
            !hasDecisiveContactQuestion &&
            checker.questionTriggersContactOutcome(q);

          // Disable the EditButton or not
          const disabled =
            ((checker.isConclusive() && !isQuestionInStack) ||
              !isQuestionInStack) &&
            isPermitCheck;

          const isFinalQuestion =
            !checker.getUpcomingQuestions().length &&
            checker.stack.length === i + 1;

          // Get the outcomeType for this question
          // In case of a "contact outcome" a QuestionAlert for need-permit within the same permit will result in a need-outcome text
          // This is because we do not support "single-permit multi-oucome
          // See: https://trello.com/c/sp6zzqiZ/959-twee-keer-gele-balk-over-niet-kunnen-vaststellen-uitkomst
          const outcomeType = checker.getOutcomesPerQuestion()[i];

          // Check if current question is causing a permit requirement
          const showQuestionAlert =
            !!outcomeType &&
            !isPermitForm &&
            q.id !== "fd15b895da25badc23fd38b0d4a9f2b3";

          return (
            <StepByStepItem
              active={isPermitForm ? true : isCurrentQuestion}
              activeStyle={
                (isPermitCheck && isCurrentQuestion) ||
                (isPermitForm && isSectionActive)
              }
              checked={answer !== undefined} // answer can be `false` in a boolean question
              customSize
              data-testid={QUESTION}
              heading={q.text}
              highlightActive={
                isPermitForm ? isSectionActive : isCurrentQuestion
              }
              key={`question-${q.id}-${mapIndex}`}
            >
              {isCurrentQuestion || (isPermitForm && isSectionActive) ? (
                // Show the current question
                <Question
                  hideNav={
                    isPermitForm && (!isFinalQuestion || !isSectionActive)
                  }
                  question={q}
                  testQuestionIndex={mapIndex}
                  onGoToPrev={handlePrevQuestion}
                  onGoToNext={handleNextQuestion}
                  showNext
                  {...{
                    isCheckerConclusive,
                    outcomeType,
                    saveAnswer,
                    showQuestionAlert,
                  }}
                />
              ) : (
                // Show the answer with an edit button
                <QuestionAnswer
                  onClick={() => handleEditQuestion(mapIndex)}
                  {...{ answer, disabled, outcomeType, showQuestionAlert }}
                />
              )}
            </StepByStepItem>
          );
        })}

      <ScrollAnchor ref={outcomeRef} />
    </>
  );
};

export default Questions;
