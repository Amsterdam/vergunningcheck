import React, { useContext } from "react";

import { SessionContext } from "../context";
import Question, { booleanOptions } from "./Question";
import QuestionAnswer from "./QuestionAnswer";
import { StepByStepItem } from "./StepByStepNavigation";

const Questions = ({
  checker,
  topic: { slug },
  setFinishedState,
  setActiveState,
  isActive,
  isFinished,
}) => {
  const sessionContext = useContext(SessionContext);
  const { questionIndex } = sessionContext[slug];

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
    // Store all answers in the session context
    sessionContext.setSessionData([
      slug,
      {
        answers: checker.getQuestionAnswers(),
      },
    ]);
  };

  const onQuestionNext = () => {
    // @TODO: Let's refacter this function as well
    const question = checker.stack[questionIndex];

    if (checker.needContactExit(question)) {
      // Go directly to "Contact Conclusion" and skip other questions
      setActiveState("conclusion");
      setFinishedState(["questions", "conslusion"], true);
    } else {
      // Load the next question or go to the "Conclusion"
      if (checker.stack.length - 1 === questionIndex) {
        // If the (stack length - 1) is equal to the questionIndex, we want to load a new question
        const next = checker.next();

        if (next) {
          // Store the new questionIndex in the session
          sessionContext.setSessionData([
            slug,
            {
              questionIndex: questionIndex + 1,
            },
          ]);
        } else {
          // Go to the "Conclusion"
          setActiveState("conclusion");
          setFinishedState(["questions", "conclusion"], true);
        }
      } else {
        // In this case, the user is changing a previously answered question and we don't want to load a new question
        sessionContext.setSessionData([
          slug,
          {
            questionIndex: questionIndex + 1,
          },
        ]);
      }
    }
  };

  const onQuestionPrev = () => {
    // Load the previous question or go to "Location"
    if (checker.stack.length > 1) {
      // Store the new questionIndex in the session
      sessionContext.setSessionData([
        slug,
        {
          questionIndex: questionIndex - 1,
        },
      ]);
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

  const onGoToQuestion = (questionId) => {
    // Checker rewinding also needs to work when you already have a conlusion
    // Go to the specific question in the stack
    setActiveState("questions");
    setFinishedState(["conclusion", "questions"], false);
    setFinishedState("locationResult", true);

    sessionContext.setSessionData([
      slug,
      {
        questionIndex: questionId,
      },
    ]);
  };

  if (checker.stack.length === 0) {
    checker.next();
  }

  // Loop through all questions
  return checker.stack.map((q, i) => {
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
  });
};

export default Questions;
