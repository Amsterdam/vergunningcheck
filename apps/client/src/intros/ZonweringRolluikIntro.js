import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { eventNames } from "../config/matomo";
import LocationIntro from "./shared/LocationIntro";

export default () => (
  <>
    <LocationIntro />
    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <Paragraph gutterBottom={8}>
      Voor deze situaties kunt u de vergunningcheck niet gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het deel van het gebouw waarin de zonwering, het rolhek, rolluik of luik
        komt, is zonder vergunning gebouwd.
      </ListItem>
    </List>

    <Paragraph>
      Hebt u een vraag of twijfelt u?{" "}
      <ContactSentence eventName={eventNames.INTRO} />
    </Paragraph>
  </>
);
