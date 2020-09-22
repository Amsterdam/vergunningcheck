import { themeSpacing } from "@datapunt/asc-ui";
import React from "react";
import styled from "styled-components";

import { Alert, PrintOnly } from "../atoms";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import { removeQuotes } from "../utils/index";
import { ConclusionOutcome } from "./Conclusion/ConclusionOutcome";
import ContactSentence from "./ContactSentence";

const ConclusionWrapper = styled.div`
  padding-bottom: ${themeSpacing(14)};
`;

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
            : `${permit.name.replace("Conclusie", "")}: ${removeQuotes(
                outcome
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
    <ConclusionWrapper>
      <ConclusionOutcome
        contactConclusion={contactConclusion}
        matomoTrackEvent={matomoTrackEvent}
        needsPermit={needsPermit}
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
    </ConclusionWrapper>
  );
};

export default withTracking(Conclusion);
