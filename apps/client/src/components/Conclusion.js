import { themeSpacing } from "@datapunt/asc-ui";
import React from "react";
import styled from "styled-components";

import { Alert, PrintOnly } from "../atoms";
import { eventNames, sections } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { sttrOutcomes } from "../sttr_client/models/checker";
import { removeQuotes } from "../utils";
import { NEED_CONTACT } from "../utils/test-ids";
import {
  ConclusionOutcome,
  NeedPermitContent,
  NeedPermitFooter,
  NoPermitDescription,
} from "./Conclusion/";
import ContactSentence from "./ContactSentence";
import Markdown from "./Markdown/index";

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

  // Check if the conclusion is 'needContact'
  const contactConclusion = conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_CONTACT
  );

  // Check if the conclusion is 'needPermit'
  const needPermit = !!conclusions.find(
    ({ outcome }) => outcome === sttrOutcomes.NEED_PERMIT
  );

  const needContactContent = {
    eventName: eventNames.CONTACT_CONCLUSION,
    mainContent: (
      <div data-testid={NEED_CONTACT}>
        <Markdown
          eventLocation={sections.CONCLUSION}
          source={contactConclusion?.description}
        />
      </div>
    ),
    title: contactConclusion?.title,
  };

  const needPermitContent = {
    eventName: eventNames.NEED_PERMIT,
    footerContent: <NeedPermitFooter />,
    mainContent: <NeedPermitContent matomoTrackEvent={matomoTrackEvent} />,
    title: "U hebt een omgevingsvergunning nodig.",
  };

  const permitFreeContent = {
    eventName: eventNames.PERMIT_FREE,
    footerContent: <NoPermitDescription />,
    title: "U hebt geen omgevingsvergunning nodig. ",
  };

  const conclusionContent = contactConclusion
    ? needContactContent
    : needPermit
    ? needPermitContent
    : permitFreeContent;

  return (
    <ConclusionWrapper>
      <ConclusionOutcome
        {...{
          conclusionContent,
          matomoTrackEvent,
        }}
      />

      {/* Disclaimer */}
      <PrintOnly withBorder avoidPageBreak>
        <Alert
          content={
            <>
              De vergunningcheck is nog in ontwikkeling. Hierdoor kunnen wij nog
              geen zekerheid bieden dat de uitkomst correct is. Ook is de
              informatie nog niet voor iedereen goed te lezen of te beluisteren.
              Wilt u iets zeker weten of wilt u meer informatie?{" "}
              <ContactSentence
                link={false}
                openingSentence={"Bel dan de gemeente op"}
              />
            </>
          }
          heading="Let op"
        />
      </PrintOnly>
    </ConclusionWrapper>
  );
};

export default withTracking(Conclusion);

// 59,71,77,82,88
