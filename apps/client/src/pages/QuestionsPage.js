import React, { useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { geturl, routes, getslug } from "../routes";
import { Helmet } from "react-helmet";

import withChecker from "../hoc/withChecker";
import Layout from "../components/Layouts/DefaultLayout";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Question, { booleanOptions } from "../components/Question";
import { Alert } from "../components/Atoms";
// import ErrorPage from "./ErrorPage";

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
  // @TODO: We shouldn't need this check because of withChecker()
  // if (!checker) {
  //   return <ErrorPage error={new Error("Error! Geen checker...")}></ErrorPage>;
  // }

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

      if (!next) {
        // Go to Result page
        history.push(geturl(routes.results, { slug }));
      } else {
        // Go to Next question
        setQuestion(next);
      }
    }
  };

  const onQuestionPrev = () => {
    if (checker?.stack?.length > 1) {
      const prev = checker.previous();
      setQuestion(prev);
    } else {
      // Go back to Location page
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
        flashMessage={<Alert>test</Alert>}
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
