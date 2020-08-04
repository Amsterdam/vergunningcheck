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
  isFinished,
}) => {
  const sessionContext = useContext(SessionContext);
  const { questionIndex } = sessionContext[slug];

  const onQuestionNext = (value) => {
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

    const next = checker.next();

    // Go directly to "Conclusion" and skip other questions
    // Only if the `sttr-checker` is the final question
    if (checker.needContactExit(question)) {
      // Undo the next() with previous(), because we were already at the final question
      checker.previous();
      // Go to "Conclusion"
      setFinishedState(["questions", "conslusion"], true);
    } else {
      // Load the next question or go to the Result Page
      if (next) {
        // Store the new questionIndex in the session
        sessionContext.setSessionData([
          slug,
          {
            questionIndex: questionIndex + 1,
          },
        ]);
      } else {
        setActiveState("conclusion", true);

        setFinishedState(["questions", "conclusion"], true);
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

  const onGoToQuestion = (questionIndex) => {
    // Checker rewinding also needs to work when you already have a conlusion
    // Go to the specific question in the stack
    checker.rewindTo(questionIndex);
    setActiveState("questions", true);
    setFinishedState(["conclusion", "questions"], false);

    sessionContext.setSessionData([
      slug,
      {
        questionIndex,
      },
    ]);
  };

  // @TODO: Refactor this map function
  return checker.stack.filter(uniqueFilter).map((q, i) => {
    if (
      q === checker.stack[questionIndex] &&
      !isFinished("questions") &&
      isFinished("address")
    ) {
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
            onSubmit={onQuestionNext}
            onGoToPrev={onQuestionPrev}
            showNext
          />
        </StepByStepItem>
      );
    } else {
      let answer;
      if (q.options) {
        answer = q.answer;
      } else {
        const responseObj = booleanOptions.find((o) => o.value === q.answer);
        answer = responseObj?.label;
      }
      return (
        <StepByStepItem
          checked
          customSize
          heading={q.text}
          key={`question-${q.id}-${i}`}
        >
          <Paragraph>
            {answer && removeQuotes(answer)}
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
  });
};

export default Questions;
