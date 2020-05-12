import React, {useState, useEffect, useContext} from "react";
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
  const [question, setQuestion] = useState(
    checker.stack[context.questionId > checker.stack.length - 1 ? checker.stack.length - 1 : context.questionId]
  );

  useEffect(() => {
    console.log(history);
    if (history.action === "POP") {
      const prev = checker.previous();
      setQuestion(prev);
    }
  }, [history.location, history.action, checker]);

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

  const onAnswerQuestion = (value, back) => {
    if (question.options && value) {
      question.setAnswer(value);
    }

    if (!question.options && value) {
      const responseObj = booleanOptions.find((o) => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    context.setData({ data: checker.getData() })
    context.setData({ questionId: checker.stack.length })

    if (needContactPermits()) {
      history.push(geturl(routes.conclusion, { slug }));
    }

    if (!needContactPermits() && !back) {
      const next = checker.next();

      if (!next) {
        // Go to Result page
        history.push(geturl(routes.results, { slug }));
      } else {
        // Go to Next question
        setQuestion(next);
        history.push(
          geturl(routes.questions, {
            slug: topic.slug,
            question: getslug(next.text),
          })
        );
      }
    }

    // Go back to Location page
    if (back && checker?.stack?.length === 1) {
      return history.push(geturl(routes.address, { slug }));
    }
    // Handle back option
    if (!needContactPermits() && back && checker?.stack?.length > 0) {
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
