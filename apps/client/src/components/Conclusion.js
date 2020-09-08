import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React, { Fragment } from "react";
import { isIE, isMobile } from "react-device-detect";

import {
  Alert,
  ComponentWrapper,
  HideForPrint,
  PrintButton,
  PrintOnly,
} from "../atoms";
import { Olo } from "../config";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import ContactSentence from "./ContactSentence";
import Markdown from "./Markdown";

const Conclusion = ({ checker, matomoTrackEvent, topic: { slug } }) => {
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

  const displayConclusions = contactConclusion
    ? [contactConclusion]
    : conclusions;

  const handlePermitButton = (e) => {
    e.preventDefault();
    matomoTrackEvent({
      category: "conclusie",
      action: "vergunning aanvragen",
      name: slug,
    });
    // Open OLO in new tab/window
    window.open(Olo.home, "_blank");
  };

  const handlePrintButton = () => {
    matomoTrackEvent({
      category: "conclusie",
      action: "conclusie opslaan",
      name: slug,
    });
    window.print();
  };

  return (
    <>
      <Paragraph>
        Op basis van uw antwoorden vindt u hieronder wat voor uw activiteit van
        toepassing is.
      </Paragraph>

      {displayConclusions.map(({ title, description }) => (
        <Fragment key={title}>
          <Heading forwardedAs="h2">{title}</Heading>
          <Markdown source={description} />
        </Fragment>
      ))}

      <HideForPrint>
        {needsPermit && !contactConclusion && (
          <ComponentWrapper marginBottom={40}>
            <Button
              type="button"
              color="secondary"
              onClick={handlePermitButton}
            >
              Vergunning aanvragen
            </Button>
          </ComponentWrapper>
        )}

        {!isMobile && !isIE && (
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
      </HideForPrint>

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
