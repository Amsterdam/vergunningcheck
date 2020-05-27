import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Paragraph, Heading } from "@datapunt/asc-ui";
import { geturl, routes } from "../routes";
import { OLO } from "../config";
import withFinalChecker from "../hoc/withFinalChecker";
import { CONCLUSION_PAGE } from "../utils/test-ids";
import Layout from "../components/Layouts/DefaultLayout";
import Markdown from "../components/Markdown";
import Form from "../components/Form";
import Nav from "../components/Nav";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Helmet from "react-helmet";
import Context from "../context";

const outcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"',
};
const ConclusionPage = ({ topic, checker }) => {
  const history = useHistory();
  const context = useContext(Context);
  const { slug } = topic;

  // find conclusions we want to display to the user
  const conclusions = checker.permits
    .filter((permit) => !!permit.getOutputByDecisionId("dummy"))
    .map((permit) => {
      const outcome = permit.getOutputByDecisionId("dummy");
      const dummyDecision = permit.getDecisionById("dummy");
      const matchingRules = dummyDecision.getMatchingRules();

      return {
        outcome,
        title:
          outcome === outcomes.NEED_CONTACT
            ? "Neem contact op met de gemeente"
            : `${permit.name.replace("Conclusie", "")}: ${outcome.replace(
                /['"]+/g,
                ""
              )}`,
        description: matchingRules[0].description,
      };
    });

  const needsPermit = !!conclusions.find(
    ({ outcome }) => outcome === outcomes.NEED_PERMIT
  );
  const contactConclusion = conclusions.find(
    ({ outcome }) => outcome === outcomes.NEED_CONTACT
  );
  const displayConclusions = contactConclusion
    ? [contactConclusion]
    : conclusions;

  const previousUrl = contactConclusion
    ? geturl(routes.questions, { slug })
    : geturl(routes.results, { slug });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (needsPermit) {
      window.open(OLO.home, "_blank");
    } else {
      history.push(geturl(routes.intro, { slug }) + "?resetChecker=true");
    }
  };

  const goBack = () => {
    context.setData({ questionIndex: context.questionIndex });
    history.replace(previousUrl);
  };

  return (
    <Layout>
      <Helmet>
        <title>Conclusie - {topic.text.heading}</title>
      </Helmet>
      <Form onSubmit={handleSubmit} data-testid={CONCLUSION_PAGE}>
        <Heading forwardedAs="h1">Conclusie</Heading>

        <Paragraph>
          Op basis van uw antwoorden vindt u hieronder wat voor uw activiteit
          van toepassing is.
        </Paragraph>

        {displayConclusions.map(({ title, description }) => (
          <Fragment key={title}>
            <Heading forwardedAs="h2">{title}</Heading>
            <Markdown source={description} />
          </Fragment>
        ))}

        <Nav
          onGoToPrev={goBack}
          showPrev
          showNext
          nextText={needsPermit ? "Naar het omgevingsloket" : "Begin opnieuw"}
          formEnds
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ConclusionPage);
