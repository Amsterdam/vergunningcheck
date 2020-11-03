import { setTag } from "@sentry/browser";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ScrollAnchor } from "../atoms";
import { eventNames, sections } from "../config/matomo";
import useTopicSession from "../hooks/useTopicSession";
import { removeQuotes, scrollToRef } from "../utils/index";
import Question, { booleanOptions } from "./Question";
import QuestionAnswer from "./QuestionAnswer";
import { StepByStepItem } from "./StepByStepNavigation";

const Questions = ({
  checker,
  goToQuestion,
  isActive,
  isFinished,
  matomoTrackEvent,
  setActiveState,
  setFinishedState,
  topic: { name, slug },
}) => {
  const { topicData, setTopicData } = useTopicSession();
  const [skipAnsweredQuestions, setSkipAnsweredQuestions] = useState(false);
  const [contactConclusion, setContactConclusion] = useState(false);
  const conclusionRef = useRef(null);

  const { answers, questionIndex } = topicData;

  const goToConclusion = useCallback(() => {
    setActiveState(sections.CONCLUSION);
    setFinishedState([sections.QUESTIONS, sections.CONCLUSION], true);
    matomoTrackEvent({
      action: checker.stack[questionIndex].text,
      name: eventNames.GOTO_CONCLUSION,
    });
    // Wrap in a timeout to prevent a miscalculation when the `Question` component collapses
    setTimeout(() => {
      scrollToRef(conclusionRef, 20);
    }, 0);
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
      setActiveState(sections.LOCATION_RESULT);
      setFinishedState(sections.LOCATION_RESULT, false);
    }
  };

  const onGoToQuestion = useCallback(
    (questionId) => {
      // Checker rewinding also needs to work when you already have a conlusion
      // Go to the specific question in the stack
      setActiveState(sections.QUESTIONS);
      setFinishedState([sections.CONCLUSION, sections.QUESTIONS], false);
      setFinishedState(sections.LOCATION_RESULT, true);

      goToQuestion(questionId);
    },
    [goToQuestion, setActiveState, setFinishedState]
  );

  // @TODO: Move to checker.js
  const getUserAnswer = (question) => {
    const booleanAnswers =
      !question.options &&
      booleanOptions.find((o) => o.value === question.answer);
    return question.options ? question.answer : booleanAnswers?.label;
  };

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
    // Bug fix in case of refresh: hide already future answered questions (caused by setQuestionAnswers() in withChecker)
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
    slug,
    setTopicData,
  ]);

  const isQuestionSectionActive = isActive(sections.QUESTIONS);

  useEffect(() => {
    // Track active questions
    if (isQuestionSectionActive) {
      matomoTrackEvent({
        action: checker.stack[questionIndex].text,
        name: eventNames.ACTIVE_QUESTION,
      });
    }
  }, [checker.stack, isQuestionSectionActive, matomoTrackEvent, questionIndex]);

  let disableFutureQuestions = false;

  // Check which questions are causing the need for a permit
  // @TODO: We can refactor this and move to checker.js
  const permitsPerQuestion = [];
  checker.isConclusive() &&
    checker.permits.forEach((permit) => {
      const conclusionDecision = permit.getDecisionById("dummy");
      if (
        conclusionDecision.getOutput() === '"Vergunningplicht"' ||
        conclusionDecision.getOutput() === '"NeemContactOpMet"'
      ) {
        const decisiveDecisions = conclusionDecision.getDecisiveInputs();
        decisiveDecisions.forEach((decision) => {
          const decisiveQuestion = decision.getDecisiveInputs().pop();
          const index = checker.stack.indexOf(decisiveQuestion);
          permitsPerQuestion[index] = true;
        });
      }
    });

  // Styling to overwrite the line between the Items
  const activeStyle = { marginTop: -1, borderColor: "white" };

  const saveAnswer = (value) => {
    // This makes sure when a question is changed that a possible visible Conclusion is removed
    if (isFinished(sections.QUESTIONS)) {
      setFinishedState(sections.QUESTIONS, false);
    }

    const question = checker.stack[questionIndex];

    let userAnswer, userAnswerLabel;
    // List question
    if (question.options && value !== undefined) {
      userAnswer = value;
      userAnswerLabel = removeQuotes(value);
    }
    // Boolean question
    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      userAnswer = responseObj.value;
      userAnswerLabel = responseObj.label;
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
        // Mainly needed to fix bug in case of refresh (caused by setQuestionAnswers() in withChecker)
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
        const showConclusionAlert = !!permitsPerQuestion[i];

        return (
          <StepByStepItem
            active={isCurrentQuestion}
            checked={userAnswer}
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
                saveAnswer={saveAnswer}
                showNext
                showPrev
                {...{
                  checker,
                  questionIndex,
                  shouldGoToConlusion,
                  showConclusionAlert,
                  userAnswer,
                }}
              />
            ) : (
              // Show the answer with an edit button
              <QuestionAnswer
                onClick={() => onGoToQuestion(i)}
                questionNeedsContactExit={checker.needContactExit(q)}
                {...{ showConclusionAlert, userAnswer }}
              />
            )}
          </StepByStepItem>
        );
      })}
      {checker._getUpcomingQuestions().map((q, i) => {
        // @TODO: refactor this part
        // Define userAnswer
        const booleanAnswers =
          !q.options && booleanOptions.find((o) => o.value === q.answer);
        const userAnswer = q.options ? q.answer : booleanAnswers?.label;

        // Skip unanswered questions or in case of Contact Conclusion
        if (!userAnswer || contactConclusion) {
          return null;
        }

        // Get new index
        const index = i + 1 + checker.stack.length;

        // Check if current question is causing a conclusion
        const showConclusionAlert = !!permitsPerQuestion[index];

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
              {...{ disabled, showConclusionAlert, userAnswer }}
            />
          </StepByStepItem>
        );
      })}

      <ScrollAnchor ref={conclusionRef} />
    </>
  );
};

export default Questions;
