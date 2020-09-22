import { Heading, Paragraph, themeSpacing } from "@datapunt/asc-ui";
import React, { ReactNode } from "react";
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
  const handlePrintButton = () => {
    matomoTrackEvent({
      action: actions.DOWNLOAD,
      name: eventNames.SAVE_CONCLUSION,
    });
    window.print();
  };

  const { footerContent, mainContent, title } = conclusionContent;

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
        f6bbad3be24892794e64e6925ef2fdb83625aa
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

      {footerContent}

      <HideForPrint>
        <NewCheckerModal />
      </HideForPrint>
    </ConclusionOutcomeWrapper>
  );
};

export default ConclusionOutcome;
