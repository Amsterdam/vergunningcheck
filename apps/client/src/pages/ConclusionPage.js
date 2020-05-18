import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Paragraph, Heading, Alert } from "@datapunt/asc-ui";
import { isMobile } from "react-device-detect";
import { geturl, routes } from "../routes";
import { OLO } from "../config";
import withFinalChecker from "../hoc/withFinalChecker";

import { CONCLUSION_PAGE } from "../utils/test-ids";
import DownloadButton from "../components/Atoms/DownloadButton";
import PrintOnly from "../components/Atoms/PrintOnly";
import Layout from "../components/Layouts/DefaultLayout";
import Markdown from "../components/Markdown";
import Form from "../components/Form";
import ConclusionPrint from "../components/ConclusionPrint";
import Nav from "../components/Nav";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Helmet from "react-helmet";

const outcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"',
};
const ConclusionPage = ({ topic, checker }) => {
  const history = useHistory();
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

  return (
    <Layout>
      <Helmet>
        <title>Conclusie - {topic.text.heading}</title>
      </Helmet>
      <Form onSubmit={handleSubmit} data-testid={CONCLUSION_PAGE}>
        <PrintOnly>
          <ConclusionPrint checker={checker} />
        </PrintOnly>

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

        {!isMobile && (
          <DownloadButton
            type="button"
            color="primary"
            onClick={() => window.print()}
            style={{ alignSelf: "flex-start" }}
          >
            Conclusie opslaan
          </DownloadButton>
        )}

        <PrintOnly style={{ marginTop: 20 }} withBorder>
          <Alert>
            <Heading forwardedAs="h2">Proclaimer</Heading>
            <Paragraph
              style={{
                maxWidth: 600,
              }}
            >
              De Vergunningcheck is een hulpmiddel. Het geeft informatie over
              situaties die veel voorkomen. U kunt er geen rechten aan ontlenen.
              Dat betekent dat het geen zekerheid geeft. Wilt u het zeker weten?
              Neem dan contact op met de gemeente.
            </Paragraph>
          </Alert>
        </PrintOnly>

        <Nav
          onGoToPrev={() => history.push(previousUrl)}
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
