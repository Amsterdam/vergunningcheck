import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { ReactNode } from "react";
import { isIE, isMobile } from "react-device-detect";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms/index";
import { actions, eventNames } from "../../config/matomo";
import { PRINT_BUTTON } from "../../utils/test-ids";
import NewCheckerModal from "./NewCheckerModal";

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
    <>
      <Paragraph gutterBottom={isMobile ? 16 : 20}>
        U bent klaar met de vergunningcheck. Dit is de uitkomst:
      </Paragraph>

      <ComponentWrapper marginBottom={24}>
        <Heading forwardedAs="h2">{title}</Heading>
      </ComponentWrapper>

      <HideForPrint>
        {mainContent}

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

      <NewCheckerModal />
    </>
  );
};

export default ConclusionOutcome;