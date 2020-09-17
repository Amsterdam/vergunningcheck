import { Button, Heading, ListItem, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { ComponentWrapper, HideForPrint, List, PrintButton } from "../atoms";
import { Olo } from "../config";
import { sections } from "../config/matomo";
import { actions, eventNames } from "../config/matomo";
import Link from "./Link";
import Markdown from "./Markdown";

type Props = {
  contactConclusion: { title: string; description: string };
  needsPermit: boolean;
  matomoTrackEvent: Function;
};

export const ConclusionOutcome: React.FC<Props> = ({
  contactConclusion,
  needsPermit,
  matomoTrackEvent,
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
      <Heading forwardedAs="h2">{contactConclusion?.title || heading}</Heading>
      {needsPermit && (
        <Paragraph>
          U kunt deze vergunning aanvragen bij het landelijk omgevingsloket
        </Paragraph>
      )}
      {contactConclusion?.description && (
        <Markdown
          eventLocation={sections.CONCLUSION}
          source={contactConclusion.description}
        />
      )}
      <HideForPrint>
        <ComponentWrapper marginBottom={10}>
          <Button type="button" color="secondary" onClick={handlePermitButton}>
            Vergunning aanvragen
          </Button>
        </ComponentWrapper>
        {!isIE && !isMobile && (
          <PrintButton
            marginTop={contactConclusion && 5}
            onClick={handlePrintButton}
            variant="textButton"
          >
            Conclusie opslaan
          </PrintButton>
        )}
      </HideForPrint>
      {needsPermit && (
        <>
          <Heading forwardedAs="h2">Meer weten?</Heading>
          <Paragraph>
            Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog
            meer aan moet denken als u gaat starten? Op onze pagina
            <Link>omgevingsvergunning</Link> is alle informatie te vinden.
          </Paragraph>
        </>
      )}
      {!needsPermit && !contactConclusion && (
        <>
          <Heading forwardedAs="h3">Waar u verder op moet letten:</Heading>
          <List variant="bullet">
            <ListItem>
              U moet voldoen aan de eisen van het Bouwbesluit. In het
              Bouwbesluit staan ook eisen voor de brandveiligheid.
            </ListItem>
            <ListItem>
              U moet rekening houden met beschermde flora en fauna. Bijvoorbeeld
              een nest zwaluwen onder de dakpannen.
            </ListItem>
          </List>
          <Heading forwardedAs={"h3"}>Denk ook aan:</Heading>
          <List variant={"bullet"}>
            <ListItem>
              Het plaatsen van een hijskraan of container op straat of het
              reserveren van een parkeervak.
            </ListItem>
            <ListItem>Het afvoeren van bouw- en sloopafval.</ListItem>
            <ListItem>Het risico dat u asbest tegenkomt.</ListItem>
            <ListItem>
              Het burenrecht. Denk hierbij bijvoorbeeld aan uitzicht op het
              terrein van de buren.
            </ListItem>
            <ListItem>
              De gevolgen van het plaatsen van een kozijn voor de WOZ-waarde van
              uw huis.
            </ListItem>
          </List>
        </>
      )}
    </>
  );
};
