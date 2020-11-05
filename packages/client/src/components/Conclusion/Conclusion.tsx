import { themeSpacing } from "@amsterdam/asc-ui";
import { imtrOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";
import styled from "styled-components";

import { sections } from "../../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import { NEED_CONTACT } from "../../utils/test-ids";
import Disclaimer from "../Disclaimer";
import Markdown from "../Markdown";
import { ConclusionOutcome, NeedPermitContent, NoPermitDescription } from ".";

const ConclusionWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;

const Conclusion: React.FC<{ checker: any } & MatomoTrackEventProps> = ({
  checker,
  matomoTrackEvent,
}) => {
  // Get all the outcomes to display
  const outcomes = checker.getOutcomesToDisplay();
  const outcomeType = checker.outcomeType();

  // Define the hard-coded content
  const needPermitContent = {
    mainContent: <NeedPermitContent />,
    title: "U hebt een omgevingsvergunning nodig.",
  };
  const permitFreeContent = {
    footerContent: <NoPermitDescription />,
    title: "U hebt geen omgevingsvergunning nodig. ",
  };

  // Define permit outcome variables
  let conclusionContent,
    showDiscaimer = false;
  if (outcomeType === imtrOutcomes.NEED_CONTACT) {
    // Need contact
    const getNeedContactContent = outcomes.find(
      ({ outcome }: { outcome: string }) =>
        outcome === imtrOutcomes.NEED_CONTACT
    );
    // This content is coming from the JSON file
    conclusionContent = {
      mainContent: (
        <div data-testid={NEED_CONTACT}>
          <Markdown
            eventLocation={sections.CONCLUSION}
            source={getNeedContactContent.description}
          />
        </div>
      ),
      title: getNeedContactContent.title,
    };
  } else if (outcomeType === imtrOutcomes.NEED_PERMIT) {
    // Need permit
    conclusionContent = needPermitContent;
    showDiscaimer = true;
  } else if (outcomeType === imtrOutcomes.PERMIT_FREE) {
    // Permit free
    conclusionContent = permitFreeContent;
    showDiscaimer = true;
  } else {
    // None of the above outcomes
    return null;
  }
  // @TODO: extend with needReport and needReportAndPermit
  // See: https://github.com/Amsterdam/vergunningcheck/pull/668

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
