import React, { useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { geturl, routes, getslug, autofillRoutes } from "../routes";
import { Helmet } from "react-helmet";

import withAutofillData from "../hoc/withAutofillData";
import Layout from "../components/Layouts/DefaultLayout";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Question, { booleanOptions } from "../components/Question";
import { autofillMap } from "../autofill";

const QuestionsPage = ({ topic, checker }) => {
  const params = useParams();
  const history = useHistory();
  const [question, setQuestion] = useState(
    checker.stack[checker.stack.length - 1]
  );

  const { question: questionSlug } = params;
  const currSlug = getslug(question.text);

  // Update URL based on question text
  if (!questionSlug || questionSlug !== currSlug) {
    return (
      <Redirect
        to={geturl(routes.questions, {
          slug: topic.slug,
          question: currSlug,
        })}
      />
    );
  }
  const { slug } = topic;

  const needContactPermits = () =>
    checker.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        (rule) => rule.outputValue === '"NeemContactOpMet"'
      );
    });

  const onQuestionNext = (value) => {
    if (question.options) {
      question.setAnswer(value);
    } else {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    if (needContactPermits()) {
      history.push(geturl(routes.conclusion, { slug }));
    } else {
      const next = checker.next();

      if (next) {
        // Go to Next question
        setQuestion(next);
      } else {
        // Go to Result page
        history.push(geturl(routes.results, { slug }));
      }
    }
  };

  const onQuestionPrev = () => {
    if (checker?.stack?.length > 1) {
      const prev = checker.previous();
      setQuestion(prev);
    } else {
      goBack();
    }
  };

  const goBack = () => {
    // Go back to Location page if needed or intropage otherwise
    const dataNeed = checker.getAutofillDataNeeds(autofillMap).shift();

    // See if any questions have data needs
    if (dataNeed) {
      history.push(geturl(autofillRoutes[dataNeed], { slug }));
    } else {
      // No data needs, send back to intro
      history.push(geturl(routes.intro, { slug }));
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

export default withAutofillData(QuestionsPage);
