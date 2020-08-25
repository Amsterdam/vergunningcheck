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
      <ListItem>het plaatsen van de dakkapel zelf.</ListItem>
    </List>

    <IntroSituationDescription />

    <Paragraph>
      U kunt deze vergunningcheck gebruiken als u een nieuwe dakkapel plaatst of
      als u een bestaande vernieuwt.
    </Paragraph>

    <Heading forwardedAs="h4">Uitzonderingen:</Heading>
    <Paragraph gutterBottom={8}>
      In de volgende situaties is het niet mogelijk de vergunningcheck te
      gebruiken:
    </Paragraph>
    <List variant="bullet" style={{ marginBottom: 12 }}>
      <ListItem>
        U gaat de dakkapel plaatsen op een woonwagen, een tijdelijk gebouw of
        een vakantiehuis.
      </ListItem>
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het deel van het gebouw waarin de dakkapel komt, is zonder vergunning
        gebouwd.
      </ListItem>
    </List>
    <ContactSentence eventName={eventNames.INTRO_EXTRAORDINARY} />
  </>
);
