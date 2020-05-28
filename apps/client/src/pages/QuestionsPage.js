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
  const [question, setQuestion] = useState(
    checker.stack[context.questionIndex]
      ? checker.stack[context.questionIndex]
      : checker.stack[checker.stack.length - 1]
  );
  const { slug } = topic;

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
          if (context.questionIndex > 0) {
            const prev = checker.previous();
            setQuestion(prev);
          } else {
            history.push(geturl(routes.address, { slug }));
          }
        }
      }
    });
  }, [locationKeys, checker, history, context.questionIndex, slug]);

  // Update URL based on question text
  if (!questionSlug) {
    // first question
    context.setData({ questionIndex: 0 });
    checker.rewindTo(0);
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
      const next = context.resultsShown
        ? checker.stack[context.questionIndex]
        : checker.next();

      if (!next) {
        // Go to Result page
        context.setData({ data: checker.getData() });
        history.push(geturl(routes.results, { slug }));
      }
      if (next) {
        // Go to Next question
        setQuestion(next);

        context.setData({
          data: checker.getData(),
          questionIndex: context.questionIndex + 1,
        });

        history.push(
          geturl(routes.questions, {
            slug: topic.slug,
            question: getslug(next.text),
          })
        );
      }
    }

    // Go back to Location page
    if (back && checker.stack.length === 1) {
      return history.push(geturl(routes.address, { slug }));
    }
    // Handle back button
    if (!needContactPermits() && back && context.questionIndex > 0) {
      const prev = checker.previous();
      setQuestion(prev);
      history.push(
        geturl(routes.questions, {
          slug: topic.slug,
          question: getslug(prev.text),
        })
      );
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
