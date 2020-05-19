import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { geturl, routes, getslug } from "../routes";
import { Helmet } from "react-helmet";

import withChecker from "../hoc/withChecker";
import Layout from "../components/Layouts/DefaultLayout";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Question, { booleanOptions } from "../components/Question";
import Context from "../context";

const QuestionsPage = ({ topic, checker }) => {
  const context = useContext(Context);
  const params = useParams();
  const history = useHistory();
  const { question: questionSlug } = params;
  const [locationKeys, setLocationKeys] = useState([]);
  const [question, setQuestion] = useState(checker.stack[context.questionId]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          // Handle forward event
          const next = checker.next();
          setQuestion(next);
        } else {
          //handle back button
          setLocationKeys((keys) => [location.key, ...keys]);
          const prev = checker.previous();
          setQuestion(prev);
        }
      }
    });
  }, [locationKeys, checker, history]);

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

  const { slug } = topic;

  const needContactPermits = () =>
    checker.permits.find((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(
        (rule) => rule.outputValue === '"NeemContactOpMet"'
      );
    });

  const onAnswerQuestion = (value, back) => {
    if (question.options && value) {
      question.setAnswer(value);
    }

    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    if (needContactPermits()) {
      // go to to conclusion fall out
      history.push(geturl(routes.conclusion, { slug }));
    }

    if (!needContactPermits() && !back) {
      const next = context.resultsShown ? checker.stack[context.questionId] : checker.next();

      console.log(context.resultsShown);

      if (!next) {
        // Go to Result page
        context.setData({ data: checker.getData() });
        history.push(geturl(routes.results, { slug }));
      }
      if (next) {
        // Go to Next question
        setQuestion(next);
        context.setData({ questionId: context.questionId + 1 });
        history.push(
          geturl(routes.questions, {
            slug: topic.slug,
            question: getslug(next),
          })
        );
      }
    }

    // Go back to Location page
    if (back && context.questionId === 0) {
      return history.push(geturl(routes.address, { slug }));
    }
    // Handle back option
    if (!needContactPermits() && back && context.questionId > 0) {
      const prev = checker.previous();
      setQuestion(prev);
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
        onSubmit={onAnswerQuestion}
        showNext
        showPrev
      />

      <DebugDecisionTable checker={checker} />
    </Layout>
  );
};

export default withChecker(QuestionsPage);
