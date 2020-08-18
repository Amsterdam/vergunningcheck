import { Heading, Paragraph } from "@datapunt/asc-ui";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import React, { Fragment } from "react";
import { isMobile } from "react-device-detect";

import { Alert, ComponentWrapper, PrintButton, PrintOnly } from "../atoms";
import { sttrOutcomes } from "../sttr_client/models/checker";
import Markdown from "./Markdown";

const Conclusion = ({ checker, setActiveState, topic: { slug } }) => {
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

  const displayConclusions = contactConclusion
    ? [contactConclusion]
    : conclusions;

  const handlePrintButton = () => {
    trackEvent({
      category: "conclusion",
      action: "conclusie-opslaan",
      name: slug,
    });
    window.print();
  };

  const handleSetConclusionActive = () => {
    setActiveState("conclusion");
  };

  return (
    <div onClick={handleSetConclusionActive}>
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
          content={`De vergunningcheck is nog in ontwikkeling. Hierdoor kunnen wij nog geen zekerheid bieden dat de uitkomst correct is. Ook is de informatie nog niet voor iedereen goed te lezen of te beluisteren. Wilt u iets zeker weten of wilt u meer informatie? Bel het telefoonnummer 14 020, maandag tot en met vrijdag van 08.00 uur tot 18.00 uur.`}
        />
      </PrintOnly>
    </div>
  );
};

export default Conclusion;
