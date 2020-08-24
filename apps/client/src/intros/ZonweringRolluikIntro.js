import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
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
      Hebt u een vraag of twijfelt u? Bel dan de gemeente op{" "}
      <a href="tel:14020">14 020</a>, maandag tot en met vrijdag van 08.00 uur
      tot 18.00 uur.
    </Paragraph>
  </>
);
