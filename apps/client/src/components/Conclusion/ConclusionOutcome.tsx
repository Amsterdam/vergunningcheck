import { Heading, Paragraph } from "@datapunt/asc-ui";
import React, { ReactNode } from "react";
import { isIE, isMobile } from "react-device-detect";

import { ComponentWrapper, HideForPrint, PrintButton } from "../../atoms/index";
import { sections } from "../../config/matomo";
import { actions, eventNames } from "../../config/matomo";
import { NEED_CONTACT } from "../../utils/test-ids";
import Markdown from "../Markdown/index";
import { NeedPermitContent, NeedPermitFooter } from "./NeedPermit";
import NewCheckerModal from "./NewCheckerModal";
import { NoPermitDescription } from "./NoPermitDescription";

type Props = {
  contactConclusion: { description: string; title: string };
  matomoTrackEvent: Function;
  needPermit: boolean;
};

export const ConclusionOutcome: React.FC<Props> = ({
  contactConclusion,
  matomoTrackEvent,
  needPermit,
}) => {
  const handlePrintButton = () => {
    matomoTrackEvent({
      action: actions.DOWNLOAD,
      name: eventNames.SAVE_CONCLUSION,
    });
    window.print();
  };

  const conclusionText = {
    needPermit: {
      title: "U hebt een omgevingsvergunning nodig.",
      contentParagraph: (
        <NeedPermitContent matomoTrackEvent={matomoTrackEvent} />
      ),
      finalParagraph: <NeedPermitFooter />,
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
  if (!contactConclusion && needPermit) {
    conclusion = conclusionText.needPermit;
  }
  if (contactConclusion) {
    conclusion = conclusionText.needContact;
  }
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
