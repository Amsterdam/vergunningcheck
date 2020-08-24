import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { eventNames } from "../config/matomo";

export default () => (
  <>
    <Paragraph gutterBottom={8}>
      Met de vergunningcheck kunt u zien wanneer u een omgevingsvergunning nodig
      hebt. U kunt een vergunning nodig hebben voor:
    </Paragraph>
    <List variant="bullet">
      <ListItem>het wijzigen van een monument.</ListItem>
      <ListItem>het plaatsen van de kozijnen zelf.</ListItem>
    </List>

    <Paragraph>
      Uw situatie en uw antwoorden bepalen of u een omgevingsvergunning nodig
      hebt. U kunt een antwoord wijzigen. Zo kunt u zien op welke manier u
      misschien toch geen vergunning nodig hebt.
    </Paragraph>
    <Paragraph>
      Deze vergunningcheck gaat over kozijnen, deuren, ramen en panelen. U kunt
      hem gebruiken als u nieuwe plaatst of als u bestaande vernieuwt.
    </Paragraph>

    <Heading forwardedAs="h4">Uitzonderingen:</Heading>
    <Paragraph gutterBottom={8}>
      In de volgende situaties is het niet mogelijk de vergunningcheck te
      gebruiken:
    </Paragraph>
    <List variant="bullet" style={{ marginBottom: 12 }}>
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het deel van het gebouw waarin het kozijn komt, is zonder vergunning
        gebouwd.
      </ListItem>
    </List>
    <Paragraph>
      <ContactSentence eventName={eventNames.INTRO_EXTRAORDINARY} />
    </Paragraph>
  </>
);
