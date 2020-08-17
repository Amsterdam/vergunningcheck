import React, { useCallback, useContext, useEffect, useState } from "react";

import { SessionContext } from "../context";
import Question, { booleanOptions } from "./Question";
import QuestionAnswer from "./QuestionAnswer";
import { StepByStepItem } from "./StepByStepNavigation";

const Questions = ({
  checker,
  topic: { slug },
  setFinishedState,
  setActiveState,
  goToQuestion,
  isActive,
  isFinished,
}) => {
  const sessionContext = useContext(SessionContext);
  const [skipAnsweredQuestions, setSkipAnsweredQuestions] = useState(false);
  const [contactConclusion, setContactConclusion] = useState(false);
  const { questionIndex } = sessionContext[slug];

  const goToConclusion = useCallback(() => {
    setActiveState("conclusion");
    setFinishedState(["questions", "conslusion"], true);
  }, [setActiveState, setFinishedState]);

  const onQuestionNext = useCallback(() => {
    const question = checker.stack[questionIndex];

    if (checker.needContactExit(question)) {
      // Go directly to "Contact Conclusion" and skip other questions
      setContactConclusion(true);
      goToConclusion();
    } else {
      // Load the next question or go to the "Conclusion"
      if (checker.stack.length - 1 === questionIndex) {
        // If the (stack length - 1) is equal to the questionIndex, we want to load a new question
        const next = checker.next();

        if (next) {
          // Go to next question
          goToQuestion("next");
          // Turn skipping answered questions off
          setSkipAnsweredQuestions(true);
        } else {
          // Go to the "Conclusion"
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
    // Load the previous question or go to "Location"
    if (checker.stack.length > 1) {
      // Store the new questionIndex in the session
      goToQuestion("prev");
    }
    if (questionIndex === 0) {
      setActiveState("locationResult");
      setFinishedState("locationResult", false);
      // This prevents to uncheck the Item that holds "questions" (when all questions are answered)
      if (!isFinished("questions")) {
        setFinishedState("questions", false);
      }
    }
  };

  useEffect(() => {
    if (skipAnsweredQuestions) {
      // Turn skipping answered questions off
      setSkipAnsweredQuestions(false);

      // Loop through questions
      checker.stack.forEach((q) => {
        // @TODO: refactor this into isQuestionAnswered() because this code is used often
        const booleanAnswers =
          !q.options && booleanOptions.find((o) => o.value === q.answer);
        const userAnswer = q.options ? q.answer : booleanAnswers?.label;
        const isCurrentQuestion =
          q === checker.stack[questionIndex] && isActive("questions");

        // Skip question if already answered
        if (isCurrentQuestion && userAnswer) {
          onQuestionNext();
        }
      });
    }
  }, [checker, isActive, questionIndex, onQuestionNext, skipAnsweredQuestions]);

  const onGoToQuestion = useCallback(
    (questionId) => {
      // Checker rewinding also needs to work when you already have a conlusion
      // Go to the specific question in the stack
      setActiveState("questions");
      setFinishedState(["conclusion", "questions"], false);
      setFinishedState("locationResult", true);

      goToQuestion(questionId);
    },
    [goToQuestion, setActiveState, setFinishedState]
  );

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
    if (isFinished("questions")) {
      setFinishedState("questions", false);
    }

    // Reset the ContactConclusion
    setContactConclusion(false);

    const question = checker.stack[questionIndex];
    // Provide the user answers to the `sttr-checker`
    if (question.options && value !== undefined) {
      question.setAnswer(value);
    }
    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }
    if (checker.stack.length !== questionIndex + 1) {
      checker.rewindTo(questionIndex);
    }
    // Store all answers in the session context
    sessionContext.setSessionData([
      slug,
      {
        answers: checker.getQuestionAnswers(),
      },
    ]);
  };

  if (checker.stack.length === 0) {
    checker.next();
  }

  // Loop through all questions
  return (
    <>
      {checker.stack.map((q, i) => {
        // Define userAnswer
        const booleanAnswers =
          !q.options && booleanOptions.find((o) => o.value === q.answer);
        const userAnswer = q.options ? q.answer : booleanAnswers?.label;

        // Define if question is the current one
        const isCurrentQuestion =
          q === checker.stack[questionIndex] && isActive("questions");

        // Hide unanswered questions (eg: on browser refresh)
        if (!isCurrentQuestion && !userAnswer) return null;

        // Check if currect question is causing a permit requirement
        const questionNeedsPermit = !!permitsPerQuestion[i];

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
                onGoToPrev={onQuestionPrev}
                onGoToNext={onQuestionNext}
                saveAnswer={saveAnswer}
                showNext
                showPrev
                {...{
                  checker,
                  questionIndex,
                  questionNeedsPermit,
                  userAnswer,
                }}
              />
            ) : (
              // Show the answer with an edit button
              <QuestionAnswer
                onClick={() => onGoToQuestion(i)}
                {...{ questionNeedsPermit, userAnswer }}
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
        if (!userAnswer || contactConclusion) return null;

        // Get new index
        const index = i + checker.stack.length;

        // Check if currect question is causing a permit requirement
        const questionNeedsPermit = !!permitsPerQuestion[index];

        return (
          <StepByStepItem
            active
            checked
            customSize
            heading={q.text}
            key={`question-${q.id}-${index}`}
          >
            <QuestionAnswer
              hideEditButton={checker.isConclusive()}
              onClick={() => onGoToQuestion(index)}
              {...{ questionNeedsPermit, userAnswer }}
            />
          </StepByStepItem>
        );
      })}
    </>
  );
};

export default Questions;
