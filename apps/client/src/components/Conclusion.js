import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { Alert, ComponentWrapper, HideForPrint, PrintOnly } from "../atoms";
import UnderlinedTextButton from "../atoms/UnderlinedTextButton";
import { Olo } from "../config";
import { actions, eventNames } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import ContactSentence from "./ContactSentence";

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

      <HideForPrint>
        {needsPermit && !contactConclusion && (
          <ComponentWrapper>
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
          <ComponentWrapper marginBottom={30} marginTop={30}>
            <UnderlinedTextButton
              variant="textButton"
              onClick={handlePrintButton}
            >
              Conclusie opslaan
            </UnderlinedTextButton>
          </ComponentWrapper>
        )}
      </HideForPrint>

      {needsPermit && !contactConclusion && (
        <>
          <Heading forwardedAs="h2">Meer weten?</Heading>
          <Paragraph>
            Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog
            meer aan moet denken als u gaat starten? Op onze pagina
            omgevingsvergunning is alle informatie te vinden.
          </Paragraph>
        </>
      )}
      {!needsPermit && !contactConclusion && (
        <>
          <Heading forwardedAs="h2">Meer weten?</Heading>
          <Paragraph>
            Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog
            meer aan moet denken als u gaat starten? Op onze pagina
            omgevingsvergunning is alle informatie te vinden.
          </Paragraph>
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
