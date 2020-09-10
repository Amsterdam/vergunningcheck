import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { eventNames } from "../config/matomo";
import { IntroHeading, IntroSituationDescription } from "./shared";

export default () => (
  <>
    <IntroHeading />

    <List variant="bullet">
      <ListItem>het wijzigen van een monument.</ListItem>
      <ListItem>
        het plaatsen van de zonwering, het rolhek, rolluik of luik zelf.
      </ListItem>
    </List>

    <IntroSituationDescription />

    <Paragraph>
      U kunt deze vergunningcheck gebruiken als u een nieuwe zonwering, rolhek,
      rolluik of luik plaatst of als u een bestaande vernieuwt.
    </Paragraph>

    <Heading forwardedAs="h4">Uitzonderingen:</Heading>
    <Paragraph gutterBottom={8}>
      In de volgende situaties is het niet mogelijk de vergunningcheck te
      gebruiken:
    </Paragraph>
    <List variant="bullet" style={{ marginBottom: 12 }}>
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het gebouw, of het deel van het gebouw waarin de zonwering, het rolhek,
        rolluik of luik komt, is zonder vergunning gebouwd.
      </ListItem>
    </List>
    <Paragraph>
      <ContactSentence eventName={eventNames.INTRO_EXTRAORDINARY} />
    </Paragraph>
  </>
);
