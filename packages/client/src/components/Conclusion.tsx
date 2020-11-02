import { themeSpacing } from "@amsterdam/asc-ui";
import type { Decision, Permit, Rule } from "@vergunningcheck/imtr-client";
import { imtrOutcomes, removeQuotes } from "@vergunningcheck/imtr-client";
import React from "react";
import styled from "styled-components";

import { PrintOnly } from "../atoms";
import { sections } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { NEED_CONTACT } from "../utils/test-ids";
import {
  ConclusionOutcome,
  NeedPermitContent,
  NeedReportContent,
  NoPermitDescription,
} from "./Conclusion/";
import Disclaimer from "./Disclaimer";
import Markdown from "./Markdown";

const ConclusionWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;

const Conclusion: React.FC<{ checker: any; matomoTrackEvent: Function }> = ({
  checker,
  matomoTrackEvent,
}) => {
  // find conclusions we want to display to the user
  const conclusions = checker?.permits
    .filter((permit: Permit) => !!permit.getOutputByDecisionId("dummy"))
    .map((permit: Permit) => {
      const conclusion = permit.getDecisionById("dummy") as Decision;
      const conclusionMatchingRules = conclusion.getMatchingRules() as Rule[];
      const contactOutcome = conclusionMatchingRules.find(
        (rule) => rule.outputValue === imtrOutcomes.NEED_CONTACT
      ) as Rule;
      const outcome = (contactOutcome?.outputValue ||
        conclusionMatchingRules[0].outputValue) as string;

      return {
        outcome,
        title:
          outcome === imtrOutcomes.NEED_CONTACT
            ? "Neem contact op met de gemeente"
            : `${permit.name.replace("Conclusie", "")}: ${removeQuotes(
                outcome
              )}`,
        description:
          outcome === imtrOutcomes.NEED_CONTACT
            ? contactOutcome.description
            : conclusionMatchingRules[0].description,
      };
    });

  // Check if the conclusion is 'needContact'
  const contactConclusion = conclusions.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_CONTACT
  );

  // Check if the conclusion is 'report'
  const needReport = !!conclusions.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_REPORT
  );

  // Check if the conclusion is 'needPermit'
  const needPermit = !!conclusions.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_PERMIT
  );

  const needContactContent = {
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

  const needReportContent = {
    mainContent: <NeedReportContent />,
    title: "U hebt een meldingsplicht.",
  };

  const needPermitContent = {
    mainContent: <NeedPermitContent matomoTrackEvent={matomoTrackEvent} />,
    title: "U hebt een omgevingsvergunning nodig.",
  };

  const permitFreeContent = {
    footerContent: <NoPermitDescription />,
    title: "U hebt geen omgevingsvergunning nodig. ",
  };

  const conclusionContent = contactConclusion
    ? needContactContent
    : needReport
    ? needReportContent
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

      <PrintOnly avoidPageBreak withBorder>
        <Disclaimer />
      </PrintOnly>
    </ConclusionWrapper>
  );
};

export default withTracking(Conclusion);
