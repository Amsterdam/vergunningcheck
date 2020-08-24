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
  const { answers, questionIndex } = sessionContext[slug];

  const goToConclusion = useCallback(() => {
    setActiveState("conclusion");
    setFinishedState(["questions", "conclusion"], true);
  }, [setActiveState, setFinishedState]);

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
    // Load the previous question
    if (answers && questionIndex > 0) {
      goToQuestion("prev");
    } else {
      // Go to Location Result, because the user was at the first question
      setActiveState("locationResult");
      setFinishedState(["locationResult"], false);
    }
  };

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

    // @TODO: Refactor this code and move to checker.js
    // Bug fix in case of refresh: hide already future answered questions (caused by setQuestionAnswers() in withChecker)
    if (!contactConclusion) {
      checker.stack.forEach((q, i) => {
        if (checker.needContactExit(q)) {
          // Set questionIndex to this question index to make sure already answered questions are hidden
          sessionContext.setSessionData([
            slug,
            {
              questionIndex: i,
            },
          ]);

          // Set Contact Conclusion
          setContactConclusion(true);
        }
      });
    }
  }, [
    checker,
    contactConclusion,
    isActive,
    questionIndex,
    onGoToQuestion,
    onQuestionNext,
    setContactConclusion,
    skipAnsweredQuestions,
    sessionContext,
    slug,
  ]);

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

    // Set Contact Conclusion
    setContactConclusion(checker.needContactExit(question));

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
        const showConclusionAlert = !!permitsPerQuestion[i];

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
        if (!userAnswer || contactConclusion) return null;

        // Get new index
        const index = i + checker.stack.length;

        // Check if current question is causing a conclusion
        const showConclusionAlert = !!permitsPerQuestion[index];

        return (
          <StepByStepItem
            active
            checked
            customSize
            heading={q.text}
            key={`question-${q.id}-${index}`}
          >
            <QuestionAnswer
              disabled={!!checker.isConclusive()}
              onClick={() => onGoToQuestion(index)}
              {...{ showConclusionAlert, userAnswer }}
            />
          </StepByStepItem>
        );
      })}
    </>
  );
};

export default Questions;
