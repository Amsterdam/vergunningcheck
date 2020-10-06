import { Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui";
import React, { ReactNode, useEffect } from "react";
import { isIE, isMobile } from "react-device-detect";
import styled from "styled-components";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms/index";
import { actions, eventNames } from "../../config/matomo";
import { PRINT_BUTTON } from "../../utils/test-ids";
import NewCheckerModal from "./NewCheckerModal";

const ConclusionOutcomeWrapper = styled.div`
  margin-bottom: ${themeSpacing(9)};
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
};

const ConclusionOutcome: React.FC<ConclusionOutcomeProps> = ({
  conclusionContent,
  matomoTrackEvent,
}) => {
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
    <ConclusionOutcomeWrapper>
      <Paragraph gutterBottom={isMobile ? 16 : 20}>
        U bent klaar met de vergunningcheck. Dit is de uitkomst:
      </Paragraph>

      <ComponentWrapper marginBottom={24}>
        <Heading forwardedAs="h2">{title}</Heading>
      </ComponentWrapper>

      {mainContent}

      <HideForPrint>
        {!isIE && !isMobile && (
          <PrintButton
            data-testid={PRINT_BUTTON}
            marginBottom={32}
            onClick={handlePrintButton}
            variant="textButton"
          >
            Conclusie opslaan
          </PrintButton>
        )}
      </HideForPrint>

      <ComponentWrapper marginBottom={footerContent ? 52 : 24}>
        {footerContent}
      </ComponentWrapper>

      <HideForPrint>
        <NewCheckerModal />
      </HideForPrint>
    </ConclusionOutcomeWrapper>
  );
};

export default ConclusionOutcome;
