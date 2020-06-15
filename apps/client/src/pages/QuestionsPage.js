import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import withChecker from "../hoc/withChecker";
import { SessionContext } from "../context";
import { geturl, routes, getslug } from "../routes";
import Layout from "../components/Layouts/DefaultLayout";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Question, { booleanOptions } from "../components/Question";

const QuestionsPage = ({ topic, checker }) => {
  const context = useContext(SessionContext);
  const params = useParams();
  const history = useHistory();
  const { question: questionSlug } = params;

  const [question, setQuestion] = useState(
    checker.stack[checker.stack.length - 1]
  );
  const { slug } = topic;

  useEffect(() => {
    if (!questionSlug) {
      context.setSessionData({
        answers: checker.getQuestionAnswers(),
      });
    }
  });

  // Update URL based on question text
  if (!questionSlug) {
    return (
      <Redirect
        to={geturl(routes.questions, {
          slug: topic.slug,
          question: getslug(question.text),
        })}
      />
    );
  }

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
    if (question.options && value) {
      question.setAnswer(value);
    }
    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    // Store all answers in the session context
    context.setSessionData({
      answers: checker.getQuestionAnswers(),
    });

    if (needContactPermits()) {
      // Go directly to the Conclusion Page, without passing the Results Page
      history.push(geturl(routes.conclusion, { slug }));
    } else {
      // Load next question
      const next = checker.next();

      if (!next) {
        // Go to Result page if there is no new quesion
        history.push(geturl(routes.results, { slug }));
      } else {
        // Store the new questionIndex in the session
        context.setSessionData({
          questionIndex: context.questionIndex + 1,
        });

        // Go to Next question
        setQuestion(next);

        // Change the URL to the new question
        history.push(
          geturl(routes.questions, {
            slug: topic.slug,
            question: getslug(next.text),
          })
        );
      }
    }
  };

  const onQuestionPrev = () => {
    // Store all answers in the session context
    context.setSessionData({
      answers: checker.getQuestionAnswers(),
    });

    if (checker?.stack?.length > 1) {
      const prev = checker.previous();

      // Store the new questionIndex in the session
      context.setSessionData({
        questionIndex: context.questionIndex - 1,
      });

      // Go to Prev question
      setQuestion(prev);

      // Change the URL to the new question
      history.push(
        geturl(routes.questions, {
          slug: topic.slug,
          question: getslug(prev.text),
        })
      );
    } else {
      // Go back to the Location page
      history.push(geturl(routes.address, { slug }));
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {topic.text.heading} - {question.text}
        </title>
      </Helmet>
      <Question
        question={question}
        onSubmit={onQuestionNext}
        onGoToPrev={onQuestionPrev}
        showNext
        showPrev
      />

      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default withChecker(QuestionsPage);
