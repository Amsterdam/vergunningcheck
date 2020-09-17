import { Button, Heading, ListItem, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";

import { ComponentWrapper, HideForPrint, List, PrintButton } from "../atoms";
import { Olo, topics } from "../config";
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
  const { slug } = useParams();
  const topic = topics.find((t) => t.slug === slug);
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
        <Markdown
          eventLocation={sections.CONCLUSION}
          source={contactConclusion.description}
        />
      )}
      <HideForPrint>
        {needsPermit && (
          <ComponentWrapper marginBottom={32}>
            <Button
              color="secondary"
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
      {needsPermit && (
        <>
          <Heading forwardedAs="h2">Meer weten?</Heading>
          <Paragraph>
            Wilt u weten hoe de aanvraag werkt, wat de kosten zijn of waar u nog
            meer aan moet denken als u gaat starten? Op onze pagina
            <Link
              variant={"inline"}
              href={
                "https://www.amsterdam.nl/veelgevraagd/?productid=%7B215DE049-EFA3-492D-A4B1-EDFF40E0BC51%7D#case_%7BC7581CB6-A3F4-4FCA-B631-C93EF03A108D%7D"
              }
            >
              omgevingsvergunning
            </Link>{" "}
            is alle informatie te vinden.
          </Paragraph>
        </>
      )}
      {!needsPermit && !contactConclusion && (
        <>
          <Paragraph>
            U hebt geen vergunning nodig voor {topic?.name.toLowerCase()}. Wél
            moet u op een aantal dingen letten voordat u gaat beginnen. Uw
            aannemer kan u daarbij helpen.
          </Paragraph>
          <Heading forwardedAs="h3">
            Dit is waar u verder op moet letten:
          </Heading>
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
            <ListItem>Toestemming van de VvE.</ListItem>
          </List>
        </>
      )}
    </>
  );
};
