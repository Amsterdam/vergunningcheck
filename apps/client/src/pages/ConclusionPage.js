import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Paragraph, Heading } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { geturl, routes } from "../routes";
import { OLO } from "../config";
import withFinalChecker from "../hoc/withFinalChecker";

import { SessionContext } from "../context";
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
const ConclusionPage = ({ topic, checker }) => {
  const sessionContext = useContext(SessionContext);
  const history = useHistory();
  const { trackEvent } = useMatomo();
  const { slug } = topic;

  const {
    streetName,
    houseNumberFull,
    postalCode,
    residence,
  } = sessionContext.address[slug];

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

  /**
   * Demo saveCheckerResult function
   *
   * This function is called:
   * - every time the conclusion page is loaded (without user data)
   * - every time the user wants to save the progress (including user data)
   * - every time the user wants to save the conclusion (including user data)
   *
   * This function is called from another file. This is just a sketch.
   */
  const saveCheckerResult = () => {
    const mutationData = {
      environmentUrl: window.location.href,
      appVersion: process.env.REACT_APP_VERSION,
      topic,

      // How in the world are we going to get STTR version(s)?
      // In topic.sttrFile we know the JSON file, but that's it
      // If we really want the STTR version, we can do that 2 ways:
      // 1) We go into topics.source.json and go get all activity id's and with those go into the xml files
      // 2) (Re)decide to add them into the [topic].json file
      activities: [
        {
          id: "monument activity",
          version: "1.2.4",
        },
        {
          id: "building activity",
          version: "1.3.2",
        },
      ],

      // Get `questionAnswers()` from checker.js in branch feature/autofill PR#127
      // We need our own unique question id's (questionHash?) and not the changing id's from FL
      // `getQuestionAnswers()` example array:
      // [
      //   'chappie-unique-hash-839472340': "Yes, because",
      //   'chappie-unique-hash-839472341': false,
      //   'chappie-unique-hash-839472342': "No, because",
      //   'chappie-unique-hash-839472343': true,
      // ]
      // questionAnswers: getQuestionAnswers(),

      // The current `displayConclusions()` needs a rename and a small refactor
      // Example array:
      // [
      //   {
      //     outcome: "Toestemmingsvrij",
      //     title: "Het wijzigen van een monument bij een dakraam",
      //     description: "U woont...",
      //   },
      //   {
      //     outcome: "Vergunningplicht",
      //     title: "Dakraam bouwen",
      //     description: "U hebt...",
      //   },
      // ]
      permitConclusions: displayConclusions, // needs to be refactored to permitConclusions

      // See Trello card "Refactor Context"
      registerLookups: {
        monument: {},
        cityScape: {},
        bag: {
          // We can only store information which it's imposible to relate to an individual
          // `postalCode` and `streetname` are general information which we can store
          postalCode: "",
          streetname: "",
          // All other information can only be stored when user agrees to save personal data
          houseNumber: "",
          houseNumberFull: "",
          id: "",
          // ...
        },
      },

      userInput: {
        address: {
          // We can only store information which it's imposible to relate to an individual
          // `postalCode` is general information which we can store
          postalCode,
          // All other information can only be stored when user agrees to save personal data
          houseNumberFull,

          // suffix, // We need to store this
        },

        // Store `geo`, because it's also free of personal information
        // geo: {
        // ...
        // },
      },
    };

    console.log(mutationData);
  };
  saveCheckerResult();

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

          <Heading forwardedAs="h2">Adresgegevens</Heading>
          <Paragraph gutterBottom={30}>
            {streetName} {houseNumberFull}
            <br />
            {postalCode} {residence}
          </Paragraph>
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

export default withFinalChecker(ConclusionPage);
