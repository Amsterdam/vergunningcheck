import { themeSpacing } from "@amsterdam/asc-ui";
import {
  Checker,
  clientOutcomes,
  imtrOutcomes,
} from "@vergunningcheck/imtr-client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { sections } from "../../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import Disclaimer from "../Disclaimer";
import Markdown from "../Markdown";
import NeedReportAndPermitContent from "./NeedReportAndPermitContent";
import {
  ConclusionOutcome,
  NeedPermitContent,
  NeedReportContent,
  NoPermitDescription,
} from ".";

const ConclusionWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;

const {
  NEED_BOTH_PERMIT_AND_REPORT,
  NEED_CONTACT,
  NEED_PERMIT,
  NEED_REPORT,
  PERMIT_FREE,
} = clientOutcomes;

const Conclusion: React.FC<{ checker: Checker } & MatomoTrackEventProps> = ({
  checker,
  matomoTrackEvent,
}) => {
  const { t } = useTranslation();

  // Get all the outcomes to display
  const outcomes = checker.getOutcomesToDisplay();

  // The "need contact" content comes from the IMTR file itself
  const outcomeType = checker.getClientOutcomeType();
  // This function can be moved to `imtr-client`
  const getNeedContactContent = outcomes.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_CONTACT
  );

  // Define the content for the Conclusion components
  const contents = {
    [NEED_BOTH_PERMIT_AND_REPORT]: {
      mainContent: <NeedReportAndPermitContent />,
      title: "U hebt zowel een meldingsplicht als vergunnngsplicht.",
    },
    [NEED_CONTACT]: {
      mainContent: (
        <Markdown
          eventLocation={sections.CONCLUSION}
          source={getNeedContactContent?.description || ""}
        />
      ),
      title: getNeedContactContent?.title || "",
    },
    [NEED_PERMIT]: {
      mainContent: <NeedPermitContent />,
      title: t("outcome.needPermit.you need a permit"),
    },
    [NEED_REPORT]: {
      mainContent: <NeedReportContent />,
      title: "U hebt een meldingsplicht.",
    },
    [PERMIT_FREE]: {
      footerContent: <NoPermitDescription />,
      title: t("outcome.permitFree.you dont need a permit"),
    },
  };

  const conclusionContent = contents[outcomeType];
  const showDiscaimer = outcomeType !== NEED_CONTACT;

  if (!conclusionContent) {
    // Convert this to a unit test
    throw new Error("The contents have not been configured properly.");
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
