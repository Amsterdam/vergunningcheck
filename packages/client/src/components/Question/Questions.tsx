import { captureException, setTag } from "@sentry/browser";
import * as imtr from "@vergunningcheck/imtr-client";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

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
  const { setValue } = useForm();
  const outcomeRef = useRef<any>(null);
  const [contactOutcome, setContactOutcome] = useState(false);
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

      if (isPermitForm) {
        goToNextSection();
      } else {
        const question = checker.stack[imtrQuestionIndex];

        const userEvent = isCheckerConclusive()
          ? GOTO_OUTCOME
          : GOTO_NEXT_QUESTION;
        const eventType = isUserEvent ? userEvent : "";

        if (question && checker.needContactExit(question)) {
          // Go directly to "Contact Outcome" and skip other questions
          goToOutcome(isUserEvent);
        } else {
          // Load the next question or go to the "Outcome"

          // @TODO: refactor this code
          // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
          if (checker.stack.length - 1 === imtrQuestionIndex) {
            // If the (stack length - 1) is equal to the questionIndex, we want to load a new question
            const next = checker.next();

            if (next) {
              goToQuestion(questionIndex + 1, eventType);

              // Turn skipping answered questions on
              setSkipAnsweredQuestions(true);
            } else {
              goToOutcome(isUserEvent);
            }
          } else {
            // In this case, the user is changing a previously answered question and we don't want to load a new question
            goToQuestion(questionIndex + 1, eventType);
            // Turn skipping answered questions on
            setSkipAnsweredQuestions(true);
          }
        }
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
    (questionIndex) => {
      editQuestionHook && editQuestionHook();

      // Go to the specific question in the stack
      goToQuestion(questionIndex, EDIT_QUESTION);
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

  // @TODO: fix this part, because it should just be handled by `checker.isConclusive()`
  // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
  const isCheckerConclusive = () => {
    if (!checker || !checker.isConclusive()) {
      return false;
    } else if (contactOutcome) {
      return true;
    }

    // Go through all questions and check if they are answered
    // There is still in bug _getUpcomingQuestions() where some irrelevant questions are unanswered
    return !checker.stack
      .concat(checker._getUpcomingQuestions())
      .find((q) => q.answer === undefined);
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

  useEffect(() => {
    // @TODO: Refactor this code and move to checker.ts
    // Bug fix in case of refresh: hide already future answered questions (caused by setQuestionAnswers())
    // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
    if (checker && !contactOutcome) {
      checker.stack.forEach((q, i) => {
        if (checker.needContactExit(q)) {
          // Set questionIndex to this question index to make sure already answered questions are hidden
          setTopicData({
            questionIndex: i + preQuestionsCount,
          });

          // Set Contact Outcome
          setContactOutcome(true);
        }
      });
    }
    //eslint-disable-next-line
  }, [checker, contactOutcome]);

  if (!checker) return null;

  // Show all questions in case of an active Form
  const showAllQuestions = isPermitForm && address && isSectionActive;

  // @TODO: fix this style
  // Styling to overwrite the line between the Items
  const activeStyle = { marginTop: -1, borderColor: "white" };

  let disableFutureQuestions = false;

  // Check which questions are causing the need for a permit
  // @TODO: Move this to `imtr-client`
  // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
  let permitsPerQuestion: imtr.ClientOutcomes[] = [];
  checker.permits.forEach((permit: imtr.Permit) => {
    const outcomeDecision = permit.getDecisionById("dummy");

    if (outcomeDecision) {
      const imtrOutcome = outcomeDecision.getOutput();
      let outcomeType = imtr.ClientOutcomes.PERMIT_FREE;

      if (imtrOutcome === imtr.outcomes.NEED_CONTACT) {
        outcomeType = imtr.ClientOutcomes.NEED_CONTACT;
      } else if (imtrOutcome === imtr.outcomes.NEED_PERMIT) {
        outcomeType = imtr.ClientOutcomes.NEED_PERMIT;
      } else if (imtrOutcome === imtr.outcomes.NEED_REPORT) {
        outcomeType = imtr.ClientOutcomes.NEED_REPORT;
      }

      if (outcomeType) {
        const decisiveDecisions = outcomeDecision.getDecisiveInputs() as imtr.Decision[];

        decisiveDecisions.forEach((decision) => {
          const decisiveQuestion = decision
            .getDecisiveInputs()
            .pop() as imtr.Question;
          const index = checker.stack.indexOf(decisiveQuestion);
          if (!permitsPerQuestion[index]) {
            permitsPerQuestion[index] = outcomeType;
          }
        });
      }
    }
  });

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
    const { id, text } = question;

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

    // Set Contact Outcome
    setContactOutcome(checker.needContactExit(question));

    // Store all answers in the session context
    setTopicData({
      answers: checker.getQuestionAnswers(),
    });

    // @TODO: find out if this is still necessary:
    // Set the value of the radio group to the selected value with react-hook-form's setValue
    // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
    setValue(id, label);
  };

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
        }}
      />

      {/* Loop through the stack */}
      {checker.stack.map((q, i) => {
        // @TODO: Refactor this code and move to checker.ts
        // We don't want to render future questions if the current index is the decisive answer for the Contact Outcome
        // Mainly needed to fix bug in case of refresh (caused by setQuestionAnswers())
        // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip

        const mapIndex = i + preQuestionsCount;

        if (
          !showAllQuestions &&
          contactOutcome &&
          !checker._getUpcomingQuestions().length &&
          imtrQuestionIndex < i
        ) {
          return null;
        }

        const { answer } = q;

        // Define if question is the current one
        const isCurrentQuestion =
          q === checker.stack[imtrQuestionIndex] && isSectionActive;

        // Hide unanswered questions (eg: on browser refresh)
        if (!showAllQuestions && answer === undefined && !isCurrentQuestion) {
          return null;
        }

        // Disable all future question if this question is last of the stack
        // We need this because it is very hard to detect future open questions and this is causing bugs
        // @TODO: fix this by stop using the combo of checker.stack and checker._getUpcomingQuestions()
        // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
        if (isCurrentQuestion && checker.stack.length === mapIndex + 1) {
          disableFutureQuestions = true;
        }

        // Check if current question is causing a permit requirement
        const showQuestionAlert =
          !!permitsPerQuestion[mapIndex - preQuestionsCount] && !isPermitForm;

        // Define the outcome type
        const outcomeType: imtr.ClientOutcomes = permitsPerQuestion[i];

        // Check if this is the last question
        const isFinalQuestion =
          !checker._getUpcomingQuestions().length &&
          checker.stack.length === mapIndex - preQuestionsCount + 1;

        const showActiveStyle =
          (isPermitCheck && isCurrentQuestion) ||
          (isPermitForm && isSectionActive);

        return (
          <StepByStepItem
            active={isPermitForm ? true : isCurrentQuestion} // @TODO refactor this ternary
            checked={answer !== undefined} // answer can be `false` in a boolean question
            customSize
            data-testid={QUESTION}
            heading={q.text}
            highlightActive={isPermitForm ? isSectionActive : isCurrentQuestion}
            key={`question-${q.id}-${mapIndex}`}
            style={showActiveStyle ? activeStyle : {}}
          >
            {isCurrentQuestion || (isPermitForm && isSectionActive) ? (
              // Show the current question
              <Question
                hideNav={isPermitForm && (!isFinalQuestion || !isSectionActive)}
                question={q}
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
                {...{ answer, outcomeType, showQuestionAlert }}
              />
            )}
          </StepByStepItem>
        );
      })}

      {/* Loop through the upcoming questions */}
      {checker._getUpcomingQuestions().map((q, i) => {
        const mapIndex = i + preQuestionsCount;
        const { answer } = q;

        // Skip unanswered questions or in case of Contact Outcome
        if (!showAllQuestions && (answer === undefined || contactOutcome)) {
          return null;
        }

        // Get new index
        const index = mapIndex + 1 + checker.stack.length;

        // Check if current question is causing a outcome
        const showQuestionAlert =
          !!permitsPerQuestion[index - preQuestionsCount] && !isPermitForm;

        // Disable the EditButton or not
        const disabled =
          (checker.isConclusive() || disableFutureQuestions) && isPermitCheck;

        // Define the outcome type
        const outcomeType: imtr.ClientOutcomes = permitsPerQuestion[i];

        // Check if this is the last question
        const isFinalQuestion =
          checker._getUpcomingQuestions().length === i + 1;

        return (
          <StepByStepItem
            active
            checked={answer !== undefined} // answer can be `false` in a boolean question
            customSize
            data-testid={QUESTION}
            heading={q.text}
            highlightActive={isPermitForm && isSectionActive}
            key={`question-${q.id}-${index}`}
            style={isPermitForm && isSectionActive ? activeStyle : {}}
          >
            {isPermitForm && isSectionActive ? (
              // Show all questions
              <Question
                hideNav={isPermitForm && (!isFinalQuestion || !isSectionActive)}
                question={q}
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
              <QuestionAnswer
                onClick={() => handleEditQuestion(index)}
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
