import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Paragraph, Heading } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { geturl, routes } from "../routes";
import { OLO } from "../config";
import withConclusion from "../hoc/withConclusion";

import { CONCLUSION_PAGE } from "../utils/test-ids";
import Layout from "../components/Layouts/DefaultLayout";
import Markdown from "../components/Markdown";
import Form from "../components/Form";
import QuestionAnswerTable from "../components/QuestionAnswerTable";
import Nav from "../components/Nav";
import DebugDecisionTable from "../components/DebugDecisionTable";
import { Helmet } from "react-helmet";
import { PrintButton, PrintOnly, Alert, ComponentWrapper } from "../atoms";

const outcomes = {
  NEED_PERMIT: '"Vergunningplicht"',
  NEED_CONTACT: '"NeemContactOpMet"',
  PERMIT_FREE: '"Toestemmingsvrij"',
};

const ConclusionPage = ({ topic, checker, autofillData }) => {
  const history = useHistory();
  const { trackEvent } = useMatomo();
  const { slug } = topic;
  const { address } = autofillData;

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

  const handlePrintButton = () => {
    trackEvent({
      category: "conclusion",
      action: "conclusie-opslaan",
      name: slug,
    });
    window.print();
  };

  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const currentDateTime = date.toLocaleDateString("nl-NL", options);

  return (
    <Layout>
      <Helmet>
        <title>Conclusie - {topic.text.heading}</title>
      </Helmet>
      <Form onSubmit={handleSubmit} data-testid={CONCLUSION_PAGE}>
        <PrintOnly>
          <Paragraph fontSize={12}>{window.location.href}</Paragraph>

          <Heading forwardedAs="h2" styleAs="h1">
            Datum
          </Heading>
          <Paragraph>{currentDateTime} uur.</Paragraph>
          {address && (
            <>
              <Heading forwardedAs="h2">Adresgegevens</Heading>
              <Paragraph gutterBottom={30}>
                {address.streetName} {address.houseNumberFull}
                <br />
                {address.postalCode} {address.residence}
              </Paragraph>
            </>
          )}
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
          <ComponentWrapper>
            <PrintButton
              type="button"
              color="primary"
              onClick={handlePrintButton}
            >
              Conclusie opslaan
            </PrintButton>
          </ComponentWrapper>
        )}

        <PrintOnly>
          <Heading forwardedAs="h2" styleAs="h1">
            Uw antwoorden
          </Heading>
          <Paragraph>
            Hieronder kunt u per vraag uw gegeven antwoord teruglezen.
          </Paragraph>
          <QuestionAnswerTable checker={checker} />
        </PrintOnly>

        <PrintOnly style={{ marginTop: 20 }} withBorder avoidPageBreak>
          <Alert
            heading="Let op"
            content={`De vergunningcheck is nog in ontwikkeling. Hierdoor kunnen wij nog geen zekerheid bieden dat de uitkomst correct is. Ook is de informatie nog niet voor iedereen goed te lezen of te beluisteren. Wilt u iets zeker weten of wilt u meer informatie? Bel het telefoonnummer 14 020, maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.`}
          />
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

export default withConclusion(ConclusionPage);
