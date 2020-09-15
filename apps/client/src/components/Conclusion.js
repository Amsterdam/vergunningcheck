import { Button, Heading, ListItem, Paragraph } from "@datapunt/asc-ui";
import React, { Fragment } from "react";
import { isIE, isMobile } from "react-device-detect";

import {
  Alert,
  ComponentWrapper,
  HideForPrint,
  List,
  PrintButton,
  PrintOnly,
} from "../atoms";
import { Olo } from "../config";
import { actions, eventNames, sections } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import ContactSentence from "./ContactSentence";
import Link from "./Link";
import Markdown from "./Markdown";

const Conclusion = ({ checker, matomoTrackEvent }) => {
  // find conclusions we want to display to the user
  const conclusions = checker?.permits
    .filter((permit) => !!permit.getOutputByDecisionId("dummy"))
    .map((permit) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      const contactOutcome = conclusionMatchingRules.find(
        (rule) => rule.outputValue === sttrOutcomes.NEED_CONTACT
      );
      const outcome =
        contactOutcome?.outputValue || conclusionMatchingRules[0].outputValue;

      return {
        outcome,
        title:
          outcome === sttrOutcomes.NEED_CONTACT
            ? "Neem contact op met de gemeente"
            : `${permit.name.replace("Conclusie", "")}: ${outcome.replace(
                /['"]+/g,
                ""
              )}`,
        description:
          outcome === sttrOutcomes.NEED_CONTACT
            ? contactOutcome.description
            : conclusionMatchingRules[0].description,
      };
    });

  const contactConclusion = conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_CONTACT
  );

  const needsPermit = !!conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_PERMIT
  );

  const handlePermitButton = (e) => {
    e.preventDefault();
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.APPLY_FOR_PERMIT,
    });
    // Open OLO in new tab/window
    window.open(Olo.home, "_blank");
  };

  const handlePrintButton = () => {
    matomoTrackEvent({
      action: actions.DOWNLOAD,
      name: eventNames.SAVE_CONCLUSION,
    });
    window.print();
  };

  return (
    <>
      <Paragraph>
        U bent klaar met de vergunningcheck. Dit is de uitkomst:
      </Paragraph>

      {needsPermit && !contactConclusion && (
        <>
          <Heading forwardedAs="h2">
            U hebt een omgevingsvergunning nodig.
          </Heading>
          <Paragraph>
            U kunt deze vergunning aanvragen bij het landelijk omgevingsloket
          </Paragraph>
        </>
      )}
      {!needsPermit && !contactConclusion && (
        <>
          <Heading forwardedAs="h2">
            U hebt geen omgevingsvergunning nodig.
          </Heading>
        </>
      )}
      {contactConclusion && (
        <Fragment key={contactConclusion.title}>
          <Heading forwardedAs="h2">{contactConclusion.title}</Heading>
          <Markdown
            eventLocation={sections.CONCLUSION}
            source={contactConclusion.description}
          />
        </Fragment>
      )}

      <HideForPrint>
        {needsPermit && !contactConclusion && (
          <ComponentWrapper marginBottom={10}>
            <Button
              type="button"
              color="secondary"
              onClick={handlePermitButton}
            >
              Vergunning aanvragen
            </Button>
          </ComponentWrapper>
        )}

        {!isIE && !isMobile && (
          <PrintButton
            variant="textButton"
            onClick={handlePrintButton}
            marginTop={contactConclusion && 5}
          >
            Conclusie opslaan
          </PrintButton>
        )}
      </HideForPrint>

      {needsPermit && !contactConclusion && (
        <>
          <Heading forwardedAs="h2">Meer weten?</Heading>
          <Paragraph>
            Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog
            meer aan moet denken als u gaat starten? Op onze pagina
            <Link>omgevingsvergunning</Link> is alle informatie te vinden.
          </Paragraph>
        </>
      )}
      {!needsPermit && !contactConclusion && (
        <>
          <Heading forwardedAs="h3">Waar u verder op moet letten:</Heading>
          <List variant="bullet">
            <ListItem>
              U moet voldoen aan de eisen van het Bouwbesluit. In het
              Bouwbesluit staan ook eisen voor de brandveiligheid.
            </ListItem>
            <ListItem>
              U moet rekening houden met beschermde flora en fauna. Bijvoorbeeld
              een nest zwaluwen onder de dakpannen.
            </ListItem>
          </List>
          <Heading forwardedAs={"h3"}>Denk ook aan:</Heading>
          <List variant={"bullet"}>
            <ListItem>
              Het plaatsen van een hijskraan of container op straat of het
              reserveren van een parkeervak.
            </ListItem>
            <ListItem>Het afvoeren van bouw- en sloopafval.</ListItem>
            <ListItem>Het risico dat u asbest tegenkomt.</ListItem>
            <ListItem>
              Het burenrecht. Denk hierbij bijvoorbeeld aan uitzicht op het
              terrein van de buren.
            </ListItem>
            <ListItem>
              De gevolgen van het plaatsen van een kozijn voor de WOZ-waarde van
              uw huis.
            </ListItem>
          </List>
        </>
      )}

      <PrintOnly withBorder avoidPageBreak>
        <Alert
          heading="Let op"
          content={
            <>
              De vergunningcheck is nog in ontwikkeling. Hierdoor kunnen wij nog
              geen zekerheid bieden dat de uitkomst correct is. Ook is de
              informatie nog niet voor iedereen goed te lezen of te beluisteren.
              Wilt u iets zeker weten of wilt u meer informatie?{" "}
              <ContactSentence
                openingSentence={"Bel dan de gemeente op"}
                link={false}
              />
            </>
          }
        />
      </PrintOnly>
    </>
  );
};

export default withTracking(Conclusion);
