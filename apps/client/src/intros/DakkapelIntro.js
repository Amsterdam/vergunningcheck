import { Heading } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import ContactSentence from "../components/ContactSentence";
import { eventNames } from "../config/matomo";
import LocationIntro from "./shared/LocationIntro";

export default () => (
  <>
    <LocationIntro />

    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <List variant="bullet">
      <ListItem>
        Wilt u de dakkapel plaatsen op een woonwagen, een tijdelijk gebouw, een
        blokhut of een vakantiehuis?{" "}
        <ContactSentence eventName={eventNames.INTRO_EXTRAORDINARY} />
      </ListItem>
      <ListItem>
        Gaat u de woning splitsen in 2 of meer woningen?{" "}
        <ContactSentence eventName={eventNames.INTRO_SPLIT_HOUSE} />
      </ListItem>
    </List>
  </>
);
