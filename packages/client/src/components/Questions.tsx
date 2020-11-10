import { setTag } from "@sentry/browser";
import {
  Checker,
  Decision,
  Question as ImtrQuestion,
  Permit,
  imtrOutcomes,
  removeQuotes,
} from "@vergunningcheck/imtr-client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ScrollAnchor } from "../atoms";
import { eventNames, sections } from "../config/matomo";
import { useChecker, useTopic, useTracking } from "../hooks";
import useTopicSession from "../hooks/useTopicData";
import { scrollToRef } from "../utils";
import Question, { BooleanOption, booleanOptions } from "./Question";
import QuestionAnswer from "./QuestionAnswer";
import { StepByStepItem } from "./StepByStepNavigation";

export type GoToQuestionProp = "next" | "prev" | number;

type BoolFunctionProp = (component: string, value?: boolean) => boolean;
export type CheckerPageProps = {
  goToQuestion: (value: GoToQuestionProp) => void;
  isActive: BoolFunctionProp;
  isFinished: BoolFunctionProp;
  setActiveState: (component: string, value?: boolean) => void;
  setFinishedState: (component: string[] | string, value: boolean) => void;
};

// @TODO: Move to checker.js
export const getUserAnswer = (question: ImtrQuestion) => {
  if (typeof question.answer === "boolean") {
    const answers = booleanOptions.find((o) => o.value === question.answer);
    return answers?.label;
  }
  return question.answer;
};

const Questions: React.FC<CheckerPageProps> = ({
  goToQuestion,
  isActive,
  isFinished,
  setActiveState,
  setFinishedState,
}) => {
  const topic = useTopic();
  const { matomoTrackEvent } = useTracking();
  const { checker } = useChecker() as { checker: Checker };
  const { topicData, setTopicData } = useTopicSession();
  const [skipAnsweredQuestions, setSkipAnsweredQuestions] = useState(false);
  const [contactConclusion, setContactConclusion] = useState(false);
  const { name } = topic;
  const { answers, questionIndex } = topicData;
  const conclusionRef = useRef<any>(null);

  const goToConclusion = useCallback(() => {
    setActiveState(sections.CONCLUSION);
    setFinishedState([sections.QUESTIONS, sections.CONCLUSION], true);
    matomoTrackEvent({
      action: checker.stack[questionIndex].text,
      name: eventNames.GOTO_CONCLUSION,
    });
    // Wrap the function to prevent a miscalculation when the `Question` component collapses
    setImmediate(() => {
      scrollToRef(conclusionRef, 20);
    });
  }, [
    checker.stack,
    matomoTrackEvent,
    questionIndex,
    setActiveState,
    setFinishedState,
  ]);

  const onQuestionNext = useCallback(() => {
    const question = checker.stack[questionIndex];

    if (checker.needContactExit(question)) {
      // Go directly to "Contact Conclusion" and skip other questions
      goToConclusion();
    } else {
      // Load the next question or go to the "Conclusion"
      if (checker.stack.length - 1 === questionIndex) {
        // If the (stack length - 1) is equal to the questionIndex, we want to load a new question
        const next = checker.next();

        if (next) {
          goToQuestion("next");
          // Turn skipping answered questions off
          setSkipAnsweredQuestions(true);
        } else {
          goToConclusion();
        }
      } else {
        // In this case, the user is changing a previously answered question and we don't want to load a new question
        goToQuestion("next");
        // Turn skipping answered questions off
        setSkipAnsweredQuestions(true);
      }
    }
  }, [checker, questionIndex, goToQuestion, goToConclusion]);

  const onQuestionPrev = () => {
    // Load the previous question
    if (answers && questionIndex > 0) {
      goToQuestion("prev");
    } else {
      // Go to Location Result, because the user was at the first question
      setActiveState(sections.LOCATION_INPUT);
      setFinishedState(sections.LOCATION_INPUT, false);
    }
  };

  const onGoToQuestion = useCallback(
    (questionId) => {
      // Checker rewinding also needs to work when you already have a conlusion
      // Go to the specific question in the stack
      setActiveState(sections.QUESTIONS);
      setFinishedState([sections.CONCLUSION, sections.QUESTIONS], false);
      setFinishedState(sections.LOCATION_INPUT, true);

      goToQuestion(questionId);
    },
    [goToQuestion, setActiveState, setFinishedState]
  );

  const shouldGoToConlusion = () => {
    if (!checker.isConclusive()) {
      return false;
    } else if (contactConclusion) {
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
          q === checker.stack[questionIndex] && isActive(sections.QUESTIONS);

        // Skip question if already answered
        if (isCurrentQuestion && userAnswer) {
          onQuestionNext();
        }
      });
    }
  }, [checker, isActive, questionIndex, skipAnsweredQuestions, onQuestionNext]);

  useEffect(() => {
    // @TODO: Refactor this code and move to checker.js
    // Bug fix in case of refresh: hide already future answered questions (caused by setQuestionAnswers() in useChecker)
    if (!contactConclusion) {
      checker.stack.forEach((q, i) => {
        if (checker.needContactExit(q)) {
          // Set questionIndex to this question index to make sure already answered questions are hidden
          setTopicData({
            questionIndex: i,
          });

          // Set Contact Conclusion
          setContactConclusion(true);
        }
      });
    }
  }, [
    checker,
    contactConclusion,
    topicData,
    setContactConclusion,
    setTopicData,
  ]);

  const isQuestionSectionActive = isActive(sections.QUESTIONS);

  useEffect(() => {
    // Track active questions
    if (isQuestionSectionActive) {
      matomoTrackEvent({
        action: checker.stack[questionIndex]?.text || "unknown question",
        name: eventNames.ACTIVE_QUESTION,
      });
    }
  }, [checker.stack, isQuestionSectionActive, matomoTrackEvent, questionIndex]);

  let disableFutureQuestions = false;

  // Check which questions are causing the need for a permit
  // @TODO: We can refactor this and move to checker.js
  const permitsPerQuestion = [] as boolean[];
  checker.isConclusive() &&
    checker.permits.forEach((permit: Permit) => {
      const conclusionDecision = permit.getDecisionById("dummy");
      if (
        conclusionDecision?.getOutput() === imtrOutcomes.NEED_PERMIT ||
        conclusionDecision?.getOutput() === imtrOutcomes.NEED_CONTACT
      ) {
        const decisiveDecisions = conclusionDecision.getDecisiveInputs() as Decision[];
        decisiveDecisions.forEach((decision) => {
          const decisiveQuestion = decision
            .getDecisiveInputs()
            .pop() as ImtrQuestion;
          const index = checker.stack.indexOf(decisiveQuestion);
          permitsPerQuestion[index] = true;
        });
      }
    });

  // Styling to overwrite the line between the Items
  const activeStyle = { marginTop: -1, borderColor: "white" };

  const saveAnswer = (value: string) => {
    // This makes sure when a question is changed that a possible visible Conclusion is removed
    if (isFinished(sections.QUESTIONS)) {
      setFinishedState(sections.QUESTIONS, false);
    }

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

    // Set Contact Conclusion
    setContactConclusion(checker.needContactExit(question));

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
        // We don't want to render future questions if the current index is the decisive answer for the Contact Conclusion
        // Mainly needed to fix bug in case of refresh (caused by setQuestionAnswers() in useChecker)
        if (
          contactConclusion &&
          !checker._getUpcomingQuestions().length &&
          questionIndex < i
        ) {
          return null;
        }

        // Define userAnswer
        const userAnswer = getUserAnswer(q);

        // Define if question is the current one
        const isCurrentQuestion =
          q === checker.stack[questionIndex] && isActive(sections.QUESTIONS);

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

        // Check if currect question is causing a permit requirement
        const showQuestionAlert = !!permitsPerQuestion[i];

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
                questionNeedsContactExit={checker.needContactExit(q)}
                onGoToPrev={onQuestionPrev}
                onGoToNext={onQuestionNext}
                showNext
                userAnswer={
                  userAnswer === undefined ? userAnswer : userAnswer.toString()
                }
                {...{
                  saveAnswer,
                  checker,
                  questionIndex,
                  shouldGoToConlusion,
                  showQuestionAlert,
                }}
              />
            ) : (
              // Show the answer with an edit button
              <QuestionAnswer
                onClick={() => onGoToQuestion(i)}
                questionNeedsContactExit={checker.needContactExit(q)}
                userAnswer={userAnswer ? userAnswer.toString() : ""}
                {...{ showQuestionAlert }}
              />
            )}
          </StepByStepItem>
        );
      })}
      {checker._getUpcomingQuestions().map((q, i) => {
        // Define userAnswer
        const userAnswer = getUserAnswer(q);

        // Skip unanswered questions or in case of Contact Conclusion
        if (!userAnswer || contactConclusion) {
          return null;
        }

        // Get new index
        const index = i + 1 + checker.stack.length;

        // Check if current question is causing a conclusion
        const showQuestionAlert = !!permitsPerQuestion[index];

        // Disable the EditButton or not
        const disabled = checker.isConclusive() || disableFutureQuestions;

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
              userAnswer={userAnswer ? userAnswer.toString() : ""}
              {...{ disabled, showQuestionAlert }}
            />
          </StepByStepItem>
        );
      })}

      <ScrollAnchor ref={conclusionRef} />
    </>
  );
};

export default Questions;
