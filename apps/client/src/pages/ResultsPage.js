import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Paragraph } from "@datapunt/asc-ui";
import { Helmet } from "react-helmet";

import withConclusion from "../hoc/withConclusion";
import { SessionContext } from "../context";
import { routes, geturl, getslug } from "../routes";
import { RESULTS_PAGE } from "../utils/test-ids";
import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import QuestionAnswerTable from "../components/QuestionAnswerTable";
import DebugDecisionTable from "../components/DebugDecisionTable";
import AddressData from "../components/AddressData";
import AddressLine from "../components/AddressLine";

const ResultsPage = ({ topic, checker, autofillData }) => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const { slug } = topic;
  const { address } = autofillData;

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
        <Paragraph>
          Vergunningcheck uitgevoerd voor: <AddressLine address={address} />
        </Paragraph>

        <AddressData displayZoningPlans={false} address={address} />

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

export default withConclusion(ResultsPage);
