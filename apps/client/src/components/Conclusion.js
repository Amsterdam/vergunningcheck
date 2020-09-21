import React from "react";

import { Alert, PrintOnly } from "../atoms";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import { ConclusionOutcome } from "./Conclusion/ConclusionOutcome";
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

  return (
    <>
      <ConclusionOutcome
        contactConclusion={contactConclusion}
        matomoTrackEvent={matomoTrackEvent}
        needsPermit={!contactConclusion && needsPermit}
      />

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
