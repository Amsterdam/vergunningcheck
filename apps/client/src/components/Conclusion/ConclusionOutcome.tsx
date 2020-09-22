import { Button, Heading, Paragraph } from "@datapunt/asc-ui";
import React, { ReactNode } from "react";
import { isIE, isMobile } from "react-device-detect";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms/index";
import { Olo } from "../../config";
import { sections } from "../../config/matomo";
import { actions, eventNames } from "../../config/matomo";
import { NEED_CONTACT, NEED_PERMIT_BUTTON } from "../../utils/test-ids";
import Markdown from "../Markdown/index";
import { NeedsPermit } from "./NeedsPermit";
import NewCheckerModal from "./NewCheckerModal";
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

  const conclusionText = {
    needPermit: {
      title: "U hebt een omgevingsvergunning nodig.",
      contentParagraph: (
        <>
          <Paragraph gutterBottom={16}>
            U kunt deze vergunning aanvragen bij het landelijk omgevingsloket
          </Paragraph>
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
        </>
      ),
      finalParagraph: <NeedsPermit />,
    },
    needContact: {
      title: contactConclusion?.title,
      contentParagraph: (
        <div data-testid={NEED_CONTACT}>
          <Markdown
            eventLocation={sections.CONCLUSION}
            source={contactConclusion?.description}
          />
        </div>
      ),
      finalParagraph: false,
    },
    noPermit: {
      title: "U hebt geen omgevingsvergunning nodig. ",
      contentParagraph: false,
      finalParagraph: <NoPermitDescription />,
    },
  };

  let conclusion: {
    title: string | undefined;
    contentParagraph: ReactNode;
    finalParagraph: ReactNode;
  } = conclusionText.noPermit;
  if (!contactConclusion && needsPermit) {
    conclusion = conclusionText.needPermit;
  }
  if (contactConclusion) {
    conclusion = conclusionText.needContact;
  }
  console.log("need", !contactConclusion && needsPermit);
  return (
    <>
      <Paragraph gutterBottom={isMobile ? 16 : 20}>
        U bent klaar met de vergunningcheck. Dit is de uitkomst:
      </Paragraph>
      <ComponentWrapper marginBottom={16}>
        <Heading forwardedAs="h2">{conclusion.title}</Heading>
      </ComponentWrapper>
      <HideForPrint>
        {conclusion.contentParagraph}
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
      {conclusion.finalParagraph}
      <NewCheckerModal />
    </>
  );
};
