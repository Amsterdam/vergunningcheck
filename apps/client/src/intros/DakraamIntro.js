import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { sections } from "../config/matomo";
import { IntroHeading, IntroSituationDescription } from "./shared";

export default () => (
  <>
    <IntroHeading />

    <List variant="bullet">
      <ListItem>het wijzigen van een monument.</ListItem>
      <ListItem>het plaatsen van het dakraam zelf.</ListItem>
    </List>

    <IntroSituationDescription />

    <Paragraph>
      Deze vergunningcheck gaat over dakramen, daklichten en lichtstraten. U
      kunt hem gebruiken als u een nieuwe plaatst of als u een bestaande
      vernieuwt.
    </Paragraph>

    <Heading forwardedAs="h4">Uitzonderingen:</Heading>
    <Paragraph gutterBottom={8}>
      In de volgende situaties is het niet mogelijk de vergunningcheck te
      gebruiken:
    </Paragraph>
    <List variant="bullet" style={{ marginBottom: 12 }}>
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het gebouw, of het deel van het gebouw waarin het dakraam komt, is
        zonder vergunning gebouwd.
      </ListItem>
    </List>
    <Paragraph>
      <ContactSentence eventName={sections.INTRO} />
    </Paragraph>
  </>
);
