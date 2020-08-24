import { Heading, OrderedList, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { eventNames } from "../config/matomo";

export default () => (
  <>
    <Paragraph gutterBottom={12}>
      Met de vergunningcheck kunt u zien wanneer u een omgevingsvergunning nodig
      hebt. U kunt een vergunning nodig hebben voor:
    </Paragraph>
    <OrderedList>
      <ListItem>het wijzigen van een monument.</ListItem>
      <ListItem>het plaatsen van de dakkapel zelf.</ListItem>
    </OrderedList>

    <Paragraph>
      Uw situatie en uw antwoorden bepalen of u een omgevingsvergunning nodig
      hebt. U kunt een antwoord wijzigen. Zo kunt u zien op welke manier u
      misschien toch geen vergunning nodig hebt.
    </Paragraph>
    <Paragraph>
      U kunt deze vergunningcheck gebruiken als u een nieuwe dakkapel plaatst of
      als u een bestaande vernieuwt.
    </Paragraph>

    <Heading forwardedAs="h4">Uitzonderingen:</Heading>
    <Paragraph gutterBottom={12}>
      In de volgende situaties is het niet mogelijk de vergunningcheck te
      gebruiken:
    </Paragraph>
    <List variant="bullet">
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
    <Paragraph>
      <ContactSentence eventName={eventNames.INTRO_EXTRAORDINARY} />
    </Paragraph>
  </>
);
