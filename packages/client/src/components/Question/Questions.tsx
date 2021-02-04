import { captureException, setTag } from "@sentry/browser";
import {
  ClientOutcomes,
  Decision,
  Question as ImtrQuestion,
  Permit,
  imtrOutcomes,
} from "@vergunningcheck/imtr-client";
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
import { useChecker, useSlug, useTopicData, useTracking } from "../../hooks";
import { Answer, SectionFunctions } from "../../types";
import { scrollToRef } from "../../utils";
import getOutcomeContent from "../../utils/getOutcomeContent";
import { QUESTION } from "../../utils/test-ids";
import { StepByStepItem } from "../StepByStepNavigation";
import { Question, QuestionAnswer } from "./";

type QuestionsProps = {
  editQuestionHook?: () => void;
  isActive: boolean;
  saveAnswerHook?: () => void;
  sectionFunctions: SectionFunctions;
};

const Questions: FunctionComponent<QuestionsProps> = ({
  editQuestionHook,
  isActive,
  saveAnswerHook,
  sectionFunctions,
}) => {
  const { checker } = useChecker();
  const { setValue } = useForm();
  const outcomeRef = useRef<any>(null);
  const [contactOutcome, setContactOutcome] = useState(false);
  const [skipAnsweredQuestions, setSkipAnsweredQuestions] = useState(false);
  const slug = useSlug();
  const { topicData, setTopicData } = useTopicData();
  const { matomoTrackEvent } = useTracking();

  const { questionIndex } = topicData;
  const { goToNextSection } = sectionFunctions;

  const { GOTO_NEXT_QUESTION, GOTO_PREV_QUESTION, GOTO_OUTCOME } = eventNames;
  const { EDIT_QUESTION } = actions;

  // This function handles the user-event of going to a new question
  const goToQuestion = useCallback(
    (index: number, eventType?: string) => {
      if (!checker) return;

      if (!checker.stack[index]) {
        const error = `goToQuestion failed: question with index "${index}" not found on stack`;

        console.error(error);
        captureException(error);
        return;
      }

      const { text } = checker.stack[questionIndex];

      // TrackEvent for specfic event type
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
          action: checker.stack[index].text,
          name: eventNames.ACTIVE_QUESTION,
        });
      }

      // Update session with new question to rerender the page
      setTopicData({
        questionIndex: index,
      });
    },

    //eslint-disable-next-line
    [checker?.stack, questionIndex]
  );

  const handleNextQuestion = useCallback(
    (isUserEvent = true) => {
      if (!checker) return;

      const question = checker.stack[questionIndex];

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
        if (checker.stack.length - 1 === questionIndex) {
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
    },
    //eslint-disable-next-line
    [checker, questionIndex]
  );

  const handlePrevQuestion = () => {
    // Load the previous question
    goToQuestion(questionIndex - 1, GOTO_PREV_QUESTION);
  };

  const handleEditQuestion = useCallback(
    (questionId) => {
      editQuestionHook && editQuestionHook();

      // Go to the specific question in the stack
      goToQuestion(questionId, EDIT_QUESTION);
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
          action: checker.stack[questionIndex].text,
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
    [checker, questionIndex]
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
          q === checker.stack[questionIndex] && isActive;

        // Skip question if already answered
        if (isCurrentQuestion && q.answer !== undefined) {
          handleNextQuestion(false);
        }
      });
    }
    //eslint-disable-next-line
  }, [checker, isActive, questionIndex, skipAnsweredQuestions]);

  useEffect(() => {
    // @TODO: Refactor this code and move to checker.ts
    // Bug fix in case of refresh: hide already future answered questions (caused by setQuestionAnswers())
    // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
    if (checker && !contactOutcome) {
      checker.stack.forEach((q, i) => {
        if (checker.needContactExit(q)) {
          // Set questionIndex to this question index to make sure already answered questions are hidden
          setTopicData({
            questionIndex: i,
          });

          // Set Contact Outcome
          setContactOutcome(true);
        }
      });
    }
    //eslint-disable-next-line
  }, [checker, contactOutcome]);

  if (!checker) return null;

  // @TODO: fix this style
  // Styling to overwrite the line between the Items
  const activeStyle = { marginTop: -1, borderColor: "white" };

  let disableFutureQuestions = false;

  // Check which questions are causing the need for a permit
  // @TODO: Move this to `imtr-client`
  // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
  let permitsPerQuestion: ClientOutcomes[] = [];
  checker.permits.forEach((permit: Permit) => {
    const outcomeDecision = permit.getDecisionById("dummy");

    if (outcomeDecision) {
      const imtrOutcome = outcomeDecision.getOutput();
      let outcomeType = ClientOutcomes.PERMIT_FREE;

      if (imtrOutcome === imtrOutcomes.NEED_CONTACT) {
        outcomeType = ClientOutcomes.NEED_CONTACT;
      } else if (imtrOutcome === imtrOutcomes.NEED_PERMIT) {
        outcomeType = ClientOutcomes.NEED_PERMIT;
      } else if (imtrOutcome === imtrOutcomes.NEED_REPORT) {
        outcomeType = ClientOutcomes.NEED_REPORT;
      }

      if (outcomeType) {
        const decisiveDecisions = outcomeDecision.getDecisiveInputs() as Decision[];

        decisiveDecisions.forEach((decision) => {
          const decisiveQuestion = decision
            .getDecisiveInputs()
            .pop() as ImtrQuestion;
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
  const saveAnswer = (answer: Answer /*, collection: boolean*/) => {
    // Save the changed answer to the question
    saveAnswerHook && saveAnswerHook();

    const { label, value } = answer;
    const question = checker.stack[questionIndex];
    const { id, text } = question;

    // Handle the given answer
    debugger;
    // if (collection) {
    //   question.setAnswer([value]);
    // } else {
    // question.setAnswer(value);
    // }
    question.setAnswer(value);

    // Store in Sentry
    setTag(text, label);

    matomoTrackEvent({
      action: text,
      name: `${eventNames.ANSWERED_WITH} - ${label}`,
    });

    // Previous answered questions (that aren't decisive anymore) needs to be removed from the stack
    // By rewinding, we're forcing the stack to update
    if (checker.stack.length !== questionIndex + 1) {
      checker.rewindTo(questionIndex);
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

  // Loop through all questions
  return (
    <>
      {checker.stack.map((q, i) => {
        // @TODO: Refactor this code and move to checker.ts
        // We don't want to render future questions if the current index is the decisive answer for the Contact Outcome
        // Mainly needed to fix bug in case of refresh (caused by setQuestionAnswers())
        // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
        if (
          contactOutcome &&
          !checker._getUpcomingQuestions().length &&
          questionIndex < i
        ) {
          return null;
        }

        const { answer } = q;

        // Define if question is the current one
        const isCurrentQuestion =
          q === checker.stack[questionIndex] && isActive;

        // Hide unanswered questions (eg: on browser refresh)
        if (answer === undefined && !isCurrentQuestion) {
          return null;
        }

        // Disable all future question if this question is last of the stack
        // We need this because it is very hard to detect future open questions and this is causing bugs
        // @TODO: fix this by stop using the combo of checker.stack and checker._getUpcomingQuestions()
        // See: https://trello.com/c/ZWvyG3Xi/209-refactor-questions-tests-wip
        if (isCurrentQuestion && checker.stack.length === i + 1) {
          disableFutureQuestions = true;
        }

        // Check if current question is causing a permit requirement
        const showQuestionAlert = !!permitsPerQuestion[i];

        // Define the outcome type
        const outcomeType: ClientOutcomes = permitsPerQuestion[i];

        return (
          <StepByStepItem
            active={isCurrentQuestion}
            checked={answer !== undefined} // answer can be `false` in a boolean question
            customSize
            data-testid={QUESTION}
            heading={q.text}
            highlightActive={isCurrentQuestion}
            key={`question-${q.id}-${i}`}
            style={isCurrentQuestion ? activeStyle : {}}
          >
            {isCurrentQuestion ? (
              // Show the current question
              <Question
                question={q}
                onGoToPrev={handlePrevQuestion}
                onGoToNext={handleNextQuestion}
                showNext
                {...{
                  checker,
                  outcomeType,
                  saveAnswer,
                  isCheckerConclusive,
                  showQuestionAlert,
                }}
              />
            ) : (
              // Show the answer with an edit button
              <QuestionAnswer
                onClick={() => handleEditQuestion(i)}
                {...{ answer, outcomeType, showQuestionAlert }}
              />
            )}
          </StepByStepItem>
        );
      })}
      {checker._getUpcomingQuestions().map((q, i) => {
        const { answer } = q;

        // Skip unanswered questions or in case of Contact Outcome
        if (answer === undefined || contactOutcome) {
          return null;
        }

        // Get new index
        const index = i + 1 + checker.stack.length;

        // Check if current question is causing a outcome
        const showQuestionAlert = !!permitsPerQuestion[index];

        // Disable the EditButton or not
        const disabled = checker.isConclusive() || disableFutureQuestions;

        // Define the outcome type
        const outcomeType: ClientOutcomes = permitsPerQuestion[i];

        return (
          <StepByStepItem
            active
            checked
            customSize
            data-testid={QUESTION}
            heading={q.text}
            key={`question-${q.id}-${index}`}
          >
            <QuestionAnswer
              onClick={() => handleEditQuestion(index)}
              {...{ answer, disabled, outcomeType, showQuestionAlert }}
            />
          </StepByStepItem>
        );
      })}

      <ScrollAnchor ref={outcomeRef} />
    </>
  );
};

export default Questions;
