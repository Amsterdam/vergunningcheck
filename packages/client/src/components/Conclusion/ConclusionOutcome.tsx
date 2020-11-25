import { Heading, themeSpacing } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { ReactNode, useEffect } from "react";
import { isIE, isMobile } from "react-device-detect";
import styled, { css } from "styled-components";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms/index";
import { actions, eventNames } from "../../config/matomo";
import { MatomoTrackEventProps } from "../../hoc/withTracking";
import { PRINT_BUTTON } from "../../utils/test-ids";
import NewCheckerModal from "./NewCheckerModal";

const ConclusionOutcomeWrapper = styled.div<{ showDiscaimer?: boolean }>`
  margin-bottom: ${themeSpacing(9)};

  ${({ showDiscaimer }) =>
    showDiscaimer &&
    css`
      margin-bottom: ${themeSpacing(10)};
    `};
`;

type ConclusionContentProps = {
  description?: string;
  eventName?: string;
  footerContent?: ReactNode;
  mainContent?: ReactNode;
  title: string;
};

type ConclusionOutcomeProps = {
  conclusionContent: ConclusionContentProps;
  matomoTrackEvent: Function;
  outcomeType: ClientOutcomes;
  showDiscaimer?: boolean;
};

const ConclusionOutcome: React.FC<
  ConclusionOutcomeProps & MatomoTrackEventProps
> = ({ conclusionContent, matomoTrackEvent, outcomeType, showDiscaimer }) => {
  const { footerContent, mainContent, title } = conclusionContent;

  useEffect(() => {
    matomoTrackEvent({
      action: actions.CONCLUSION_OUTCOME,
      name: title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrintButton = () => {
    matomoTrackEvent({
      action: actions.DOWNLOAD,
      name: eventNames.SAVE_CONCLUSION,
    });
    window.print();
  };

  return (
    <ConclusionOutcomeWrapper {...{ showDiscaimer }}>
      <ComponentWrapper marginBottom={16} />
      <ComponentWrapper marginBottom={24}>
        <Heading forwardedAs="h2">{title}</Heading>
      </ComponentWrapper>

      {mainContent}

      <HideForPrint>
        {!isIE && !isMobile && (
          <PrintButton
            data-testid={PRINT_BUTTON}
            marginBottom={outcomeType === ClientOutcomes.PERMIT_FREE ? 32 : 40}
            onClick={handlePrintButton}
            variant="textButton"
          >
            Uitkomst opslaan
          </PrintButton>
        )}
      </HideForPrint>

      <ComponentWrapper marginBottom={footerContent ? 52 : 0}>
        {footerContent}
      </ComponentWrapper>

      <HideForPrint>
        <NewCheckerModal />
        {!isMobile && <ComponentWrapper>&nbsp;</ComponentWrapper>}
      </HideForPrint>
    </ConclusionOutcomeWrapper>
  );
};

export default ConclusionOutcome;
