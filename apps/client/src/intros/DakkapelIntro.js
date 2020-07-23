import { Heading } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import LocationIntro from "./shared/LocationIntro";

export default () => (
  <>
    <LocationIntro />

    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <List variant="bullet">
      <ListItem>
        Wilt u de dakkapel plaatsen op een woonwagen, een tijdelijk gebouw, een
        blokhut of een vakantiehuis? Bel dan de gemeente op{" "}
        <a href="tel:14020">14 020</a>, maandag tot en met vrijdag van 08.00 uur
        tot 18.00 uur
      </ListItem>
      <ListItem>
        Gaat u de woning splitsen in 2 of meer woningen? Bel dan de gemeente op{" "}
        <a href="tel:14020">14 020</a>, maandag tot en met vrijdag van 08.00 uur
        tot 18.00 uur.
      </ListItem>
    </List>
  </>
);
