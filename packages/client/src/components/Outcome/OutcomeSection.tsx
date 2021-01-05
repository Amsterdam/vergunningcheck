import { themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes, imtrOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { urls } from "../../config";
import { eventNames, sections } from "../../config/matomo";
import { useChecker, useTopic } from "../../hooks";
import { SectionProps } from "../../pages/CheckerPage3";
import Disclaimer from "../Disclaimer";
import Loading from "../Loading";
import Markdown from "../Markdown";
import {
  DemolitionNeedReport,
  DemolitionPermitFree,
  NeedPermit,
  OutcomeContent,
  PermitFree,
} from ".";

const OutcomeWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;

const OutcomeSection: FunctionComponent<SectionProps> = () => {
  const { checker } = useChecker();
  const topic = useTopic();
  const { t } = useTranslation();

  const {
    NEED_BOTH_PERMIT_AND_REPORT,
    NEED_CONTACT,
    NEED_PERMIT,
    NEED_REPORT,
    PERMIT_FREE,
  } = ClientOutcomes;

  if (checker === undefined) {
    return <Loading />;
  }
  // Get all the outcomes to display
  const outcomes = checker.getOutcomesToDisplay();

  // The "need contact" content comes from the IMTR file itself
  const outcomeType = checker.getClientOutcomeType();
  // This function can be moved to `imtr-client`
  const getNeedContactContent = outcomes.find(
    ({ outcome }: { outcome: string }) => outcome === imtrOutcomes.NEED_CONTACT
  );

  // Define the content for the Outcome components
  const contents = {
    // This is the default content
    default: {
      [NEED_BOTH_PERMIT_AND_REPORT]: {
        title: t(
          "outcome.needBothPermitAndReport.you need both permit and report"
        ),
      },
      [NEED_CONTACT]: {
        mainContent: (
          <Markdown
            eventLocation={sections.OUTCOME}
            source={getNeedContactContent?.description || ""}
          />
        ),
        title:
          getNeedContactContent?.title ||
          t("outcome.needContact.Neem contact op met de gemeente") || // Fallback text
          "",
      },
      [NEED_PERMIT]: {
        mainContent: <NeedPermit />,
        title: t("outcome.needPermit.you need a permit"),
      },
      [NEED_REPORT]: {
        mainContent: (
          <NeedPermit contentText="Demo text for need permit outcome. We don't fully support this outcome yet" />
        ),
        title: t("outcome.needReport.you need a report"),
      },
      [PERMIT_FREE]: {
        footerContent: <PermitFree />,
        title: t("outcome.permitFree.you dont need a permit"),
      },
    },
    // This content is only relevant for the demolition checker
    demolition: {
      [NEED_CONTACT]: {
        title:
          getNeedContactContent?.title ||
          t("outcome.needContact.Neem contact op met de gemeente") || // Fallback text
          "",
      },
      [NEED_BOTH_PERMIT_AND_REPORT]: {
        mainContent: (
          <NeedPermit
            contentText={t(
              "outcome.needBothPermitAndReport.on this page you can read more how to do apply for demolition"
            )}
            eventName={eventNames.HOW_TO_APPLY_FOR_A_DEMOLITION}
            linkText={t(
              "outcome.needBothPermitAndReport.demolition permit and report"
            )}
            url={urls.DEMOLITION_PERMIT_PAGE}
          />
        ),
        title: t(
          "outcome.needBothPermitAndReport.you need both permit and report for demolition"
        ),
      },
      [NEED_PERMIT]: {
        mainContent: <NeedPermit url={urls.DEMOLITION_PERMIT_PAGE} />,
        title: t("outcome.needPermit.you need a permit for demolition"),
      },
      [NEED_REPORT]: {
        mainContent: (
          // @TODO: refactor these components, because we use the `NeedPermit` component to render the need report content, because it looks the same
          // Maybe rename this to `OutcomeLink` or `OutcomeMainContent`
          <NeedPermit
            contentText={t("outcome.needReport.on this page you can read more")}
            eventName={eventNames.HOW_TO_NOTIFY_A_DEMOLITION}
            linkText={t("outcome.needReport.notify a demolition")}
            url={urls.DEMOLITION_PERMIT_PAGE}
          />
        ),
        footerContent: <DemolitionNeedReport />,
        title: t("outcome.needReport.you need a report for demolition"),
      },
      [PERMIT_FREE]: {
        footerContent: <DemolitionPermitFree />,
        title: t("outcome.permitFree.you dont need a permit for demolition"),
      },
    },
  };

  // This part can be refactored whenever we have another checker that have custom outcomes
  const checkerContent =
    topic.name === "Bouwwerk slopen" ? contents.demolition : contents.default;

  const outcomeContent = checkerContent[outcomeType];
  const showDiscaimer = outcomeType !== NEED_CONTACT;

  if (!outcomeContent) {
    // Convert this to a unit test
    throw new Error("The contents have not been configured properly.");
  }

  return (
    <OutcomeWrapper>
      <OutcomeContent
        {...{
          outcomeContent,
          outcomeType,
          showDiscaimer,
        }}
      />

      {showDiscaimer && <Disclaimer />}
    </OutcomeWrapper>
  );
};

export default OutcomeSection;
