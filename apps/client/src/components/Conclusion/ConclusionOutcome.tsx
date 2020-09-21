import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms/index";
import { Olo } from "../../config";
import { sections } from "../../config/matomo";
import { actions, eventNames } from "../../config/matomo";
import { NEED_CONTACT, NEED_PERMIT_BUTTON } from "../../utils/test-ids";
import Markdown from "../Markdown/index";
import ConclusionModal from "./ConclusionModal";
import { NeedsPermit } from "./NeedsPermit";
import { NoPermitDescription } from "./NoPermitDescription";

type Props = {
  contactConclusion: { description: string; title: string };
  matomoTrackEvent: Function;
  needsPermit: boolean;
};

export const ConclusionOutcome: React.FC<Props> = ({
  contactConclusion,
  matomoTrackEvent,
  needsPermit,
}) => {
  const heading = needsPermit
    ? "U hebt een omgevingsvergunning nodig"
    : "U hebt geen omgevingsvergunning nodig";

  const handlePrintButton = () => {
    matomoTrackEvent({
      action: actions.DOWNLOAD,
      name: eventNames.SAVE_CONCLUSION,
    });
    window.print();
  };

  const handlePermitButton = () => {
    matomoTrackEvent({
      action: actions.CLICK_EXTERNAL_NAVIGATION,
      name: eventNames.APPLY_FOR_PERMIT,
    });
    // Open OLO in new tab/window
    window.open(Olo.home, "_blank");
  };

  return (
    <>
      <Paragraph gutterBottom={isMobile ? 16 : 20}>
        U bent klaar met de vergunningcheck. Dit is de uitkomst:
      </Paragraph>
      <ComponentWrapper marginBottom={16}>
        <Heading forwardedAs="h2">
          {contactConclusion?.title || heading}.
        </Heading>
      </ComponentWrapper>
      {needsPermit && (
        <Paragraph gutterBottom={16}>
          U kunt deze vergunning aanvragen bij het landelijk omgevingsloket
        </Paragraph>
      )}
      {contactConclusion?.description && (
        <div data-testid={NEED_CONTACT}>
          <Markdown
            eventLocation={sections.CONCLUSION}
            source={contactConclusion.description}
          />
        </div>
      )}
      <HideForPrint>
        {needsPermit && (
          <ComponentWrapper marginBottom={32}>
            <Button
              color="secondary"
              data-testid={NEED_PERMIT_BUTTON}
              onClick={handlePermitButton}
              type="button"
            >
              Vergunning aanvragen
            </Button>
          </ComponentWrapper>
        )}
        {!isIE && !isMobile && (
          <PrintButton
            marginBottom={32}
            onClick={handlePrintButton}
            variant="textButton"
          >
            Conclusie opslaan
          </PrintButton>
        )}
      </HideForPrint>

      {needsPermit && <NeedsPermit />}

      {!needsPermit && !contactConclusion && <NoPermitDescription />}

      {/* Do another checker  modal */}
      <ConclusionModal />
    </>
  );
};
