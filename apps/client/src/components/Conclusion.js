import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import React, { Fragment } from "react";
import { isMobile } from "react-device-detect";

import { Alert, ComponentWrapper, PrintButton, PrintOnly } from "../atoms";
import { Olo } from "../config";
import { sttrOutcomes } from "../sttr_client/models/checker";
import ContactSentence from "./ContactSentence";
import Markdown from "./Markdown";

const Conclusion = ({ checker, topic: { slug } }) => {
  const { trackEvent } = useMatomo();

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
    trackEvent({
      category: "conclusie",
      action: "vergunning aanvragen",
      name: slug,
    });
    // Open OLO in new tab/window
    window.open(Olo.home, "_blank");
  };

  const handlePrintButton = () => {
    trackEvent({
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

      {needsPermit && (
        <ComponentWrapper marginBottom={40}>
          <Button type="button" color="secondary" onClick={handlePermitButton}>
            Vergunning aanvragen
          </Button>
        </ComponentWrapper>
      )}

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

      <PrintOnly withBorder avoidPageBreak>
        <Alert
          heading="Let op"
          content={
            <>
              De vergunningcheck is nog in ontwikkeling. Hierdoor kunnen wij nog
              geen zekerheid bieden dat de uitkomst correct is. Ook is de
              informatie nog niet voor iedereen goed te lezen of te beluisteren.
              Wilt u iets zeker weten of wilt u meer informatie?{" "}
              <ContactSentence link={false} contact />
            </>
          }
        />
      </PrintOnly>
    </>
  );
};

export default Conclusion;
