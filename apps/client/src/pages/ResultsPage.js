import { Paragraph } from "@datapunt/asc-ui";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import AddressLine from "../components/AddressLine";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Form from "../components/Form";
import Layout from "../components/Layouts/DefaultLayout";
import Nav from "../components/Nav";
import QuestionAnswerTable from "../components/QuestionAnswerTable";
import RegisterLookupSummary from "../components/RegisterLookupSummary";
import { SessionContext } from "../context";
import withConclusion from "../hoc/withConclusion";
import { getslug, geturl, routes } from "../routes";
import { RESULTS_PAGE } from "../utils/test-ids";

const ResultsPage = ({ topic, checker }) => {
  const history = useHistory();
  const sessionContext = useContext(SessionContext);
  const { slug } = topic;
  const address = sessionContext.address[slug];

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
          Vergunningcheck uitgevoerd voor: <AddressLine address={address} />.
        </Paragraph>

        <Paragraph>
          Deze informatie hebben we gebruikt bij het invullen van de check:
        </Paragraph>

        <RegisterLookupSummary displayZoningPlans={false} address={address} />

        <Paragraph>
          Deze antwoorden heeft u gegeven bij het invullen van de
          vergunningcheck. U kunt deze antwoorden nog wijzigen. Als u een
          wijziging doet moet u misschien enkele vragen opnieuw beantwoorden.
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
