import { captureException, setTag } from "@sentry/browser";
import {
  Checker,
  ClientOutcomes,
  Decision,
  Question as ImtrQuestion,
  Permit,
  imtrOutcomes,
  removeQuotes,
} from "@vergunningcheck/imtr-client";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ScrollAnchor } from "../../atoms";
import { eventNames } from "../../config/matomo";
import { useChecker, useTopic, useTracking } from "../../hooks";
import useTopicSession from "../../hooks/useTopicData";
import { BooleanOption } from "../../types";
import { scrollToRef } from "../../utils";
import { StepByStepItem } from "../StepByStepNavigation";
import { Question, QuestionAnswer, booleanOptions } from "./";

export type GoToQuestionProp = "next" | "prev" | number;

type QuestionsProps = {
  goToNextSection: any; // XXX
  goToPrevSection: any; // XXX
  goToQuestionHook?: any; // XXX
  isActive: boolean;
  updateQuestionHook?: any; // XXX
};

// @TODO: Move to checker.js
export const getUserAnswer = (question: ImtrQuestion) => {
  if (typeof question.answer === "boolean") {
    const answers = booleanOptions.find((o) => o.value === question.answer);
    return answers?.label;
  }
  return question.answer;
};

const Questions: FunctionComponent<QuestionsProps> = ({
  goToNextSection,
  goToPrevSection,
  goToQuestionHook,
  isActive,
  updateQuestionHook,
}) => {
  const topic = useTopic();
  const { matomoTrackEvent } = useTracking();
  const { checker } = useChecker() as { checker: Checker };
  const { topicData, setTopicData } = useTopicSession();
  const [skipAnsweredQuestions, setSkipAnsweredQuestions] = useState(false);
  const [contactOutcome, setContactOutcome] = useState(false);
  const { name } = topic;
  const { answers, questionIndex } = topicData;
  const outcomeRef = useRef<any>(null);

  // Set the questionIndex the next questionId, previous questionId, or the given id.
  const goToQuestion = useCallback(
    (value: GoToQuestionProp) => {
      // let action, eventName;
      let newQuestionIndex: number;

      if (value === "next" || value === "prev") {
        // Either go 1 question next or prev
        newQuestionIndex =
          value === "next" ? questionIndex + 1 : questionIndex - 1;

        if (!checker.stack[newQuestionIndex]) {
          captureException(
            `Go to question, question with index: ${newQuestionIndex} not found on stack`
          );
          return;
        }

        // Matomo event props
        // action = checker.stack[questionIndex].text;
        // eventName =
        //   value === "next"
        //     ? eventNames.GOTO_NEXT_QUESTION
        //     : eventNames.GOTO_PREV_QUESTION;
      } else {
        // Edit specific question index (value), go directly to this new question index
        newQuestionIndex = value;

        if (!checker.stack[newQuestionIndex]) {
          captureException(
            `Go to question, question with index: ${newQuestionIndex} not found on stack`
          );
          return;
        }

        // Matomo event props
        // action = actions.EDIT_QUESTION;
        // eventName = (checker.stack[newQuestionIndex] as any).text;
      }

      // matomoTrackEvent({
      //   action,
      //   name: eventName,
      // });

      setTopicData({
        questionIndex: newQuestionIndex,
      });
    },
    [checker.stack, questionIndex, setTopicData]
  );

  const goToOutcome = useCallback(() => {
    goToNextSection();

    matomoTrackEvent({
      action: checker.stack[questionIndex].text,
      name: eventNames.GOTO_OUTCOME,
    });
    // Wrap the function to prevent a miscalculation when the `Question` component collapses
    setImmediate(() => {
      scrollToRef(outcomeRef, 20);
    });
  }, [checker, goToNextSection, matomoTrackEvent, questionIndex]);

  const onQuestionNext = useCallback(() => {
    const question = checker.stack[questionIndex];

    if (checker.needContactExit(question)) {
      // Go directly to "Contact Outcome" and skip other questions
      goToOutcome();
    } else {
      // Load the next question or go to the "Outcome"
      if (checker.stack.length - 1 === questionIndex) {
        // If the (stack length - 1) is equal to the questionIndex, we want to load a new question
        const next = checker.next();

        if (next) {
          goToQuestion("next");
          // Turn skipping answered questions off
          setSkipAnsweredQuestions(true);
        } else {
          goToOutcome();
        }
      } else {
        // In this case, the user is changing a previously answered question and we don't want to load a new question
        goToQuestion("next");
        // Turn skipping answered questions off
        setSkipAnsweredQuestions(true);
      }
    }
  }, [checker, questionIndex, goToQuestion, goToOutcome]);

  const onQuestionPrev = () => {
    // Load the previous question
    if (answers && questionIndex > 0) {
      goToQuestion("prev");
    } else {
      // Go to Location, because the user was at the first question
      goToPrevSection();
    }
  };

  const onGoToQuestion = useCallback(
    (questionId) => {
      goToQuestionHook && goToQuestionHook();

      // Go to the specific question in the stack
      goToQuestion(questionId);
    },
    [goToQuestion, goToQuestionHook]
  );

  const shouldGoToConlusion = () => {
    if (!checker.isConclusive()) {
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
    if (skipAnsweredQuestions) {
      // Turn skipping answered questions off
      setSkipAnsweredQuestions(false);

      // Loop through questions
      checker.stack.forEach((q) => {
        const userAnswer = getUserAnswer(q);

        const isCurrentQuestion =
          q === checker.stack[questionIndex] && isActive;

        // Skip question if already answered
        if (isCurrentQuestion && userAnswer) {
          onQuestionNext();
        }
      });
    }
  }, [checker, isActive, questionIndex, skipAnsweredQuestions, onQuestionNext]);

  useEffect(() => {
    // @TODO: Refactor this code and move to checker.js
    // Bug fix in case of refresh: hide already future answered questions (caused by setQuestionAnswers())
    if (!contactOutcome) {
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
  }, [checker, contactOutcome, topicData, setContactOutcome, setTopicData]);

  useEffect(() => {
    // Track active questions
    if (isActive) {
      matomoTrackEvent({
        action: checker.stack[questionIndex]?.text || "unknown question",
        name: eventNames.ACTIVE_QUESTION,
      });
    }
  }, [checker, isActive, matomoTrackEvent, questionIndex]);

  if (!checker) return null;

  let disableFutureQuestions = false;

  // Check which questions are causing the need for a permit
  // @TODO: Move this to `imtr-client`
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

  // Styling to overwrite the line between the Items
  const activeStyle = { marginTop: -1, borderColor: "white" };

  const saveAnswer = (value: string) => {
    updateQuestionHook && updateQuestionHook();

    const question = checker.stack[questionIndex];

    let userAnswer, userAnswerLabel;
    if (question.options && value !== undefined) {
      // List question
      userAnswer = value;
      userAnswerLabel = removeQuotes(value);
    } else if (!question.options && value) {
      // Boolean question
      const responseObj = booleanOptions.find(
        (o) => o.formValue === value
      ) as BooleanOption;
      userAnswer = responseObj.value;
      userAnswerLabel = responseObj.label;
    } else {
      // Undefined answer
      console.error("Undefined answer");
      return;
    }

    // Handle the given answer
    question.setAnswer(userAnswer);

    // Store in Sentry
    setTag(question.text, userAnswerLabel);

    matomoTrackEvent({
      action: question.text,
      category: name,
      name: `${eventNames.ANSWERED_WITH} - ${userAnswerLabel}`,
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
  };

  if (checker.stack.length === 0) {
    checker.next();
  }

  // Loop through all questions
  return (
    <>
      {checker.stack.map((q, i) => {
        // @TODO: Refactor this code and move to checker.js
        // We don't want to render future questions if the current index is the decisive answer for the Contact Outcome
        // Mainly needed to fix bug in case of refresh (caused by setQuestionAnswers())
        if (
          contactOutcome &&
          !checker._getUpcomingQuestions().length &&
          questionIndex < i
        ) {
          return null;
        }

        // Define userAnswer
        const userAnswer = getUserAnswer(q);

        // Define if question is the current one
        const isCurrentQuestion =
          q === checker.stack[questionIndex] && isActive;

        // Hide unanswered questions (eg: on browser refresh)
        if (!isCurrentQuestion && !userAnswer) {
          return null;
        }

        // Disable all future question if this question is last of the stack
        // We need this because it is very hard to detect future open questions and this is causing bugs
        // @TODO: fix this by stop using the combo of checker.stack and checker._getUpcomingQuestions()
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
            checked={!!userAnswer}
            customSize
            heading={q.text}
            highlightActive={isCurrentQuestion}
            key={`question-${q.id}-${i}`}
            style={isCurrentQuestion ? activeStyle : {}}
          >
            {isCurrentQuestion ? (
              // Show the current question
              <Question
                question={q}
                onGoToPrev={onQuestionPrev}
                onGoToNext={onQuestionNext}
                showNext
                userAnswer={
                  userAnswer === undefined ? userAnswer : userAnswer.toString()
                }
                {...{
                  saveAnswer,
                  checker,
                  outcomeType,
                  questionIndex,
                  shouldGoToConlusion,
                  showQuestionAlert,
                }}
              />
            ) : (
              // Show the answer with an edit button
              <QuestionAnswer
                onClick={() => onGoToQuestion(i)}
                userAnswer={userAnswer?.toString()}
                {...{ outcomeType, showQuestionAlert }}
              />
            )}
          </StepByStepItem>
        );
      })}
      {checker._getUpcomingQuestions().map((q, i) => {
        // Define userAnswer
        const userAnswer = getUserAnswer(q);

        // Skip unanswered questions or in case of Contact Outcome
        if (!userAnswer || contactOutcome) {
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
            heading={q.text}
            key={`question-${q.id}-${index}`}
          >
            <QuestionAnswer
              onClick={() => onGoToQuestion(index)}
              userAnswer={userAnswer.toString()}
              {...{ disabled, outcomeType, showQuestionAlert }}
            />
          </StepByStepItem>
        );
      })}

      <ScrollAnchor ref={outcomeRef} />
    </>
  );
};

export default Questions;
