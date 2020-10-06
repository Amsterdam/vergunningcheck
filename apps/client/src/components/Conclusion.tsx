import { themeSpacing } from "@amsterdam/asc-ui";
import React from "react";
import styled from "styled-components";

import { PrintOnly } from "../atoms";
import { sections } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { imtrOutcomes } from "../imtr_client/models/checker";
import { removeQuotes } from "../utils";
import { NEED_CONTACT } from "../utils/test-ids";
import {
  ConclusionOutcome,
  NeedPermitContent,
  NeedPermitFooter,
  NoPermitDescription,
} from "./Conclusion/";
import Disclaimer from "./Disclaimer";
import Markdown from "./Markdown";

// @TODO: import from somewehere else...
type permitProps = {
  getDecisionById: Function;
  getOutputByDecisionId: Function;
  name: string;
};
// @TODO: import from somewehere else...
type ruleProps = {
  outputValue: string;
};

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
    .filter((permit: permitProps) => !!permit.getOutputByDecisionId("dummy"))
    .map((permit: permitProps) => {
      const conclusion = permit.getDecisionById("dummy");
      const conclusionMatchingRules = conclusion.getMatchingRules();
      const contactOutcome = conclusionMatchingRules.find(
        (rule: ruleProps) => rule.outputValue === imtrOutcomes.NEED_CONTACT
      );
      const outcome =
        contactOutcome?.outputValue || conclusionMatchingRules[0].outputValue;

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

  const needPermitContent = {
    footerContent: <NeedPermitFooter />,
    mainContent: <NeedPermitContent matomoTrackEvent={matomoTrackEvent} />,
    title: "U hebt een omgevingsvergunning nodig.",
  };

  const permitFreeContent = {
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

      <PrintOnly avoidPageBreak withBorder>
        <Disclaimer />
      </PrintOnly>
    </ConclusionWrapper>
  );
};

export default withTracking(Conclusion);
