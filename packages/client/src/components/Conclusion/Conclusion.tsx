import { themeSpacing } from "@amsterdam/asc-ui";
import { Checker, imtrOutcomes } from "@vergunningcheck/imtr-client";
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
const { NEED_CONTACT, NEED_PERMIT, NEED_REPORT, PERMIT_FREE } = imtrOutcomes;

const Conclusion: React.FC<{ checker: Checker } & MatomoTrackEventProps> = ({
  checker,
  matomoTrackEvent,
}) => {
  const { t } = useTranslation();

  // Get all the outcomes to display
  const outcomes = checker.getOutcomesToDisplay();
  const outcomeType = checker.outcomeType();

  // The "need contact" content comes from the IMTR file itself
  const getNeedContactContent = outcomes.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_CONTACT
  );

  // Check if the outcome has 'report'
  const needReport = !!outcomes.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_REPORT
  );
  // Check if the outcome has 'needPermit'
  const needPermit = !!outcomes.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_PERMIT
  );

  // @TODO: refactor this to outcomeType (outcomeTypes)
  const needReportAndPermit = needReport && needPermit;

  const NEED_PERMIT_AND_REPORT = `${NEED_PERMIT} ${NEED_REPORT}`;

  // Define the content for the Conclusion components
  const contents = {
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
    [PERMIT_FREE]: {
      footerContent: <NoPermitDescription />,
      title: t("outcome.permitFree.you dont need a permit"),
    },
    [NEED_REPORT]: {
      mainContent: <NeedReportContent />,
      title: "U hebt een meldingsplicht.",
    },
    [NEED_PERMIT_AND_REPORT]: {
      mainContent: <NeedReportAndPermitContent />,
      title: "U hebt zowel een meldingsplicht als vergunnngsplicht.",
    },
  };

  const conclusionContent =
    contents[needReportAndPermit ? NEED_PERMIT_AND_REPORT : outcomeType];
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
