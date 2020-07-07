import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";

import DebugDecisionTable from "../components/DebugDecisionTable";
import Layout from "../components/Layouts/DefaultLayout";

import Question, { booleanOptions } from "../components/Question";
import { SessionContext } from "../context";
import withChecker from "../hoc/withChecker";

const WrapperPage = ({ checker }) => {
  const sessionContext = useContext(SessionContext);

  const [question, setQuestion] = useState(
    checker.stack[checker.stack.length - 1]
  );

  const needContactPermits = () =>
    checker.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        (rule) => rule.outputValue === '"NeemContactOpMet"'
      );
    });

  const onQuestionNext = (value) => {
    // Provide the user answers to the `sttr-checker`
    if (question.options && value !== undefined) {
      question.setAnswer(value);
    }
    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    // Store all answers in the session context
    sessionContext.setSessionData({
      answers: checker.getQuestionAnswers(),
    });

    // Load next question
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
        sessionContext.setSessionData({
          questionIndex: sessionContext.questionIndex + 1,
        });

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
      const prev = checker.previous();

      // Store the new questionIndex in the session
      sessionContext.setSessionData({
        questionIndex: sessionContext.questionIndex - 1,
      });

      // Go to Prev question
      setQuestion(prev);

      // Change the URL to the new question
      // go open te location page
    } else {
      // Go back to the Location page
      // go open te location page
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Wrapper Page</title>
      </Helmet>
      {checker.stack.map((q, i) => (
        <Question
          question={q}
          key={`question-${q.id}-${i}`}
          open={q === question}
          onSubmit={onQuestionNext}
          onGoToPrev={onQuestionPrev}
          showPrev
          showNext
        />
      ))}
      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default withChecker(WrapperPage);
