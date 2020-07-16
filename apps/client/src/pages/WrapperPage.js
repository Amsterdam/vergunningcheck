import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import Question, { booleanOptions } from "../checker/components/Question";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";

const WrapperPage = ({ checker, topic: { slug } }) => {
  const sessionContext = useContext(SessionContext);

  const needContactPermits = () =>
    checker.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        (rule) => rule.outputValue === '"NeemContactOpMet"'
      );
    });

  const onQuestionNext = (value) => {
    const question = checker.stack[sessionContext[slug].questionIndex];

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

    // Go directly to the Conclusion Page, without passing the Results Page
    // Only if the `sttr-checker` is the final question
    if (needContactPermits() && !next) {
      // Undo the next() with previous(), because we were already at the final question
      checker.previous();

      // Change the URL to the Conclusion Page
      // open the conclusion page
    } else {
      // Load the next question or go to the Result Page
      if (next) {
        // Store the new questionIndex in the session
        sessionContext.setSessionData([
          slug,
          {
            questionIndex: sessionContext[slug].questionIndex + 1,
          },
        ]);

        // Go to Next question
        // go go go
      } else {
        // Go to Result page if there is no new quesion
        // Go open the conclusion
      }
    }
  };

  const onQuestionPrev = () => {
    // Load the previous question or go to the Location Page
    if (checker.stack.length > 1) {
      // Store the new questionIndex in the session
      sessionContext.setSessionData([
        slug,
        {
          questionIndex: sessionContext[slug].questionIndex - 1,
        },
      ]);

      // go open te location page
    } else {
      // Go back to the Location page
      // go open te location page
    }
  };

  const onGoToQuestion = (questionIndex) => {
    // Go to the specific question in the stack
    checker.rewindTo(questionIndex);
    sessionContext.setSessionData([
      slug,
      {
        questionIndex,
      },
    ]);
  };

  return (
    <Layout>
      <Helmet>
        <title>Wrapper Page</title>
      </Helmet>
      {checker.stack.map((q, i) => {
        if (q === checker.stack[sessionContext[slug].questionIndex]) {
          return (
            <Question
              question={q}
              key={`question-${q.id}-${i}`}
              onSubmit={onQuestionNext}
              onGoToPrev={onQuestionPrev}
              showPrev
              showNext
            />
          );
        } else {
          let answer;
          if (q.options) {
            answer = q.answer;
          } else {
            const responseObj = booleanOptions.find(
              (o) => o.value === q.answer
            );
            answer = responseObj?.label;
          }
          return (
            <>
              <Heading forwardedAs="h3">{q.text}</Heading>
              <Paragraph>
                {answer?.replace(/['"]+/g, "")}
                <Button
                  style={{ marginLeft: 20 }}
                  onClick={() => onGoToQuestion(i)}
                  variant="textButton"
                >
                  Wijzig
                </Button>
              </Paragraph>
            </>
          );
        }
      })}
      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default withChecker(WrapperPage);
