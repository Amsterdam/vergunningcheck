import { Button, Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";

import { SessionContext } from "../context";
import { removeQuotes, uniqueFilter } from "../utils";
import Question, { booleanOptions } from "./Question";
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
  };

  const onGoToQuestion = (questionId) => {
    // Checker rewinding also needs to work when you already have a conlusion
    // Go to the specific question in the stack
    setActiveState("questions");
    setFinishedState(["conclusion", "questions"], false);

    sessionContext.setSessionData([
      slug,
      {
        questionIndex: questionId,
      },
    ]);
    checker.rewindTo(questionId);
  };

  if (checker.stack.length === 0) {
    checker.next();
  }

  // @TODO: Refactor this map function
  return checker.stack.filter(uniqueFilter).map((q, i) => {
    // Define userAnswer
    let userAnswer;
    if (q.options) {
      userAnswer = q.answer;
    } else {
      const responseObj = booleanOptions.find((o) => o.value === q.answer);
      userAnswer = responseObj?.label;
    }

    // Show the current active question
    if (q === checker.stack[questionIndex] && isActive("questions")) {
      return (
        <StepByStepItem
          active
          highlightActive
          customSize
          heading={q.text}
          key={`question-${q.id}-${i}`}
        >
          <Question
            question={q}
            questionIndex={questionIndex}
            checker={checker}
            onSubmit={onQuestionNext}
            onGoToPrev={onQuestionPrev}
            userAnswer={userAnswer}
            showNext
          />
        </StepByStepItem>
      );
    } else if (userAnswer) {
      // Show answered questions (beware: boolean `false` is a possible answer)
      return (
        <StepByStepItem
          checked
          customSize
          heading={q.text}
          key={`question-${q.id}-${i}`}
        >
          <Paragraph>
            {removeQuotes(userAnswer)}
            <Button
              style={{ marginLeft: 20 }}
              onClick={() => onGoToQuestion(i)}
              variant="textButton"
            >
              Wijzig
            </Button>
          </Paragraph>
        </StepByStepItem>
      );
    }
    // Hide unanswered questions (eg: on browser refresh)
    return null;
  });
};

export default Questions;
