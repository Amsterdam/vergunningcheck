import { themeSpacing } from "@amsterdam/asc-ui";
import {
  Checker,
  clientOutcomes,
  imtrOutcomes,
} from "@vergunningcheck/imtr-client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Topic } from "../../config";
import { sections } from "../../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../../hoc/withTracking";
import Disclaimer from "../Disclaimer";
import Markdown from "../Markdown";
import ConclusionOutcome from "./ConclusionOutcome";
import {
  DemolitionNeedBothReportAndPermit,
  DemolitionNeedPermit,
  DemolitionNeedReport,
  DemolitionNoPermit,
  NeedPermit,
  PermitFree,
} from "./content";

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

type ConclusionProps = {
  checker: Checker;
  topic: Topic;
};

const Conclusion: React.FC<ConclusionProps & MatomoTrackEventProps> = ({
  checker,
  matomoTrackEvent,
  topic,
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
    default: {
      // This default outcome is not used yet
      // [NEED_BOTH_PERMIT_AND_REPORT]: {
      //   mainContent: <NeedBothReportAndPermit />,
      //   title: t(
      //     "outcome.needBothPermitAndReport.you need both permit and report"
      //   ),
      // },
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
        mainContent: <NeedPermit />,
        title: t("outcome.needPermit.you need a permit"),
      },
      // This default outcome is not used yet:
      // [NEED_REPORT]: {
      //   mainContent: <NeedReport />,
      //   title: t("outcome.needReport.you need a report"),
      // },
      [PERMIT_FREE]: {
        footerContent: <PermitFree />,
        title: t("outcome.permitFree.you dont need a permit"),
      },
    },
    demolition: {
      [NEED_BOTH_PERMIT_AND_REPORT]: {
        mainContent: <DemolitionNeedBothReportAndPermit />,
        title: t(
          "outcome.needBothPermitAndReport.you need both permit and report for demolition"
        ),
      },
      [NEED_PERMIT]: {
        mainContent: <DemolitionNeedPermit />,
        title: t("outcome.needPermit.you need a permit for demolition"),
      },
      [NEED_REPORT]: {
        mainContent: <DemolitionNeedReport />,
        title: t("outcome.needReport.you need a report for demolition"),
      },
      [PERMIT_FREE]: {
        footerContent: <DemolitionNoPermit />,
        title: t("outcome.permitFree.you dont need a permit for demolition"),
      },
    },
  };

  // This part can be refactored whenever we have another checker that have custom outcomes
  const checkerContent =
    topic.name === "Bouwwerk slopen" ? contents.demolition : contents.default;
  const conclusionContent = checkerContent[outcomeType];
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
