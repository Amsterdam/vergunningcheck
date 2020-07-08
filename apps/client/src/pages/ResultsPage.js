import { Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import DebugDecisionTable from "../components/DebugDecisionTable";
import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import Nav from "../components/Nav";
import QuestionAnswerTable from "../components/QuestionAnswerTable";
import { SessionContext } from "../context";
import withFinalChecker from "../hoc/withFinalChecker";
import { getslug, geturl, routes } from "../routes";
import { RESULTS_PAGE } from "../utils/test-ids";

const ResultsPage = ({ topic, checker }) => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const { slug } = topic;

  const onGoToQuestion = (questionIndex) => {
    // Go to the specific question in the stack
    const question = checker.rewindTo(questionIndex);
    sessionContext.setSessionData({
      questionIndex,
    });

    // Change the URL to the new question
    history.push(
      geturl(routes.questions, {
        slug,
        question: getslug(question.text),
      })
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>Uitkomsten - {topic.text.heading}</title>
      </Helmet>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(geturl(routes.conclusion, { slug }));
        }}
        data-testid={RESULTS_PAGE}
      >
        <Paragraph strong>
          Hieronder kunt u per vraag uw gegeven antwoord teruglezen en eventueel
          wijzigen. Als u een wijziging doet moet u misschien enkele vragen
          opnieuw beantwoorden.
        </Paragraph>

        <QuestionAnswerTable
          topic={topic}
          checker={checker}
          onGoToQuestion={onGoToQuestion}
        />

        <Nav
          onGoToPrev={() => onGoToQuestion(checker.stack.length - 1)}
          showPrev
          showNext
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ResultsPage);
