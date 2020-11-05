import { themeSpacing } from "@amsterdam/asc-ui";
import { Checker, imtrOutcomes } from "@vergunningcheck/imtr-client";
import { Outcome } from "@vergunningcheck/imtr-client/src/types";
import React from "react";
import styled from "styled-components";

import { sections } from "../../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import Disclaimer from "../Disclaimer";
import Markdown from "../Markdown";
import { ConclusionOutcome, NeedPermitContent, NoPermitDescription } from ".";

const ConclusionWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;
const { NEED_CONTACT, NEED_PERMIT, PERMIT_FREE } = imtrOutcomes;

const Conclusion: React.FC<{ checker: Checker } & MatomoTrackEventProps> = ({
  checker,
  matomoTrackEvent,
}) => {
  // Get all the outcomes to display
  const outcomes = checker.getOutcomesToDisplay();
  const outcomeType = checker.outcomeType();

  // The "need contact" content comes from the IMTR file itself
  const getNeedContactContent = outcomes.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_CONTACT
  );
  const { description = "", title = "" } = getNeedContactContent as Outcome;

  // Define the content for the Conclusion components
  const contents = {
    [NEED_CONTACT]: {
      mainContent: (
        <Markdown eventLocation={sections.CONCLUSION} source={description} />
      ),
      title,
    },
    [NEED_PERMIT]: {
      mainContent: <NeedPermitContent />,
      title: "U hebt een omgevingsvergunning nodig.",
    },
    [PERMIT_FREE]: {
      footerContent: <NoPermitDescription />,
      title: "U hebt geen omgevingsvergunning nodig.",
    },
    // @TODO: extend with NEED_REPORT
    // See: https://github.com/Amsterdam/vergunningcheck/pull/668
  };

  const conclusionContent = contents[outcomeType];
  const showDiscaimer = outcomeType !== NEED_CONTACT;

  if (!conclusionContent) {
    return null;
  }

  return (
    <ConclusionWrapper>
      <ConclusionOutcome
        {...{
          conclusionContent,
          matomoTrackEvent,
          outcomeType,
          showDiscaimer,
        }}
      />

      {showDiscaimer && <Disclaimer />}
    </ConclusionWrapper>
  );
};

export default withTracking(Conclusion);
