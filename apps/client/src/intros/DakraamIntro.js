import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import {
  IntroHeading,
  IntroSituationDescription,
  List,
  ListItem,
} from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { eventNames } from "../config/matomo";

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
        Het deel van het gebouw waarin het dakraam komt, is zonder vergunning
        gebouwd.
      </ListItem>
    </List>
    <ContactSentence eventName={eventNames.INTRO_EXTRAORDINARY} />
  </>
);
