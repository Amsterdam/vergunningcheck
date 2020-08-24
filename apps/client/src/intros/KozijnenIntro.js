import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { eventNames } from "../config/matomo";
import LocationIntro from "./shared/LocationIntro";

export default () => (
  <>
    <LocationIntro />

    <Paragraph gutterBottom={8}>
      Deze vergunningcheck gaat over kozijnen, deuren, ramen en panelen. Voor
      deze situaties kunt u de vergunningcheck gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>
        U gaat een nieuw kozijn, deur, raam of paneel plaatsen.
      </ListItem>
      <ListItem>
        U gaat een bestaand kozijn, deur, raam of paneel vervangen of
        veranderen.
      </ListItem>
    </List>

    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <Paragraph gutterBottom={8}>
      Voor deze situaties kunt u de vergunningcheck niet gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het deel van het gebouw waarin het kozijn komt, is zonder vergunning
        gebouwd.
      </ListItem>
    </List>
    <Paragraph gutterBottom={8}>
      Hebt u een vraag of twijfelt u?{" "}
      <ContactSentence eventName={eventNames.INTRO} />
    </Paragraph>
  </>
);
