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
  const [question, setQuestion] = useState(
    checker.stack[context.questionIndex]
      ? checker.stack[context.questionIndex]
      : checker.stack[checker.stack.length - 1]
  );
  const { slug } = topic;

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "POP") {
        const next = checker.next();
        setQuestion(next);
      }
    });
  }, [checker, history, context.questionIndex, slug]);

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
    // Save to data to context on every answer, so we can always refresh
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
    } else {
      const next = context.resultsShown
        ? checker.stack[context.questionIndex]
        : checker.next();

      if (!next) {
        // Go to Result page
        context.setData({
          answers: checker.getData(),
        });
        history.push(geturl(routes.results, { slug }));
      } else {
        // Go to Next question
        context.setData({
          answers: checker.getData(),
          questionIndex: context.questionIndex + 1,
        });

        setQuestion(next);
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
    if (checker?.stack?.length > 1) {
      const prev = checker.previous();
      setQuestion(prev);
      context.setData({
        questionIndex: context.questionIndex - 1,
      });
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
