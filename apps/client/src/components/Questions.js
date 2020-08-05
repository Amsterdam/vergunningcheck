import { Button, Paragraph } from "@datapunt/asc-ui";
import React, { useContext, useState } from "react";

import { SessionContext } from "../context";
import { removeQuotes } from "../utils";
import Question, { booleanOptions } from "./Question";
import { StepByStepItem } from "./StepByStepNavigation";

const Questions = ({ checker, topic: { slug } }) => {
  const sessionContext = useContext(SessionContext);
  const [editQuestion, setEditQuestion] = useState(false);
  const { questionIndex } = sessionContext[slug];

  // Styling to overwrite the line between the Items
  const activeStyle = { marginTop: -1, borderColor: "white" };

  const onQuestionNext = (value) => {
    // @TODO: Let's refacter this function as well
    const question = checker.stack[questionIndex];

    // Provide the user answers to the `sttr-checker`
    if (question.options && value !== undefined) {
      question.setAnswer(value);
    }
    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    // Store all answers in the session context
    sessionContext.setSessionData([
      slug,
      {
        answers: checker.getQuestionAnswers(),
      },
    ]);

    if (checker.needContactExit(question)) {
      // Go directly to "Contact Conclusion" and skip other questions
      sessionContext.setSessionData([
        slug,
        {
          finishedQuestions: true,
        },
      ]);
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
          sessionContext.setSessionData([
            slug,
            {
              finishedQuestions: true,
            },
          ]);
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
    } else {
      sessionContext.setSessionData([
        slug,
        {
          finishedLocation: false,
          finishedQuestions: false,
        },
      ]);
    }
  };

  const onGoToQuestion = (questionId) => {
    // Checker rewinding also needs to work when you already have a conlusion
    // Go to the specific question in the stack
    sessionContext.setSessionData([
      slug,
      {
        questionIndex: questionId,
        finishedQuestions: false,
      },
    ]);
    checker.rewindTo(questionId);
    setEditQuestion(true);
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
    const isCurrentQuestion = q === checker.stack[questionIndex];
    // && isActive("questions"); @TODO needs to be added (in branch feature/refactor-stepper-logic)

    // Hide unanswered questions (eg: on browser refresh)
    if (!isCurrentQuestion && !userAnswer) return null;

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
            onSubmit={onQuestionNext}
            showNext
            {...{
              checker,
              editQuestion, // @TODO needs to be removed (in branch feature/refactor-stepper-logic)
              questionIndex,
              setEditQuestion, // @TODO needs to be removed (in branch feature/refactor-stepper-logic)
              userAnswer,
            }}
          />
        ) : (
          // Show the userAnswer with an Edit button
          <Paragraph gutterBottom={0}>
            {removeQuotes(userAnswer)}

            <Button
              onClick={() => onGoToQuestion(i)}
              style={{ marginLeft: 20 }}
              variant="textButton"
            >
              Wijzig
            </Button>
          </Paragraph>
        )}
      </StepByStepItem>
    );
  });
};

export default Questions;
