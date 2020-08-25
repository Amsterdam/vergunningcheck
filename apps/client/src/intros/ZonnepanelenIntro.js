import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem } from "../atoms";
import { IntroHeading, IntroSituationDescription } from "./shared";

export default () => (
  <>
    <IntroHeading />

    <List variant="bullet">
      <ListItem>het wijzigen van een monument.</ListItem>
      <ListItem>het plaatsen van de zonnepanelen of zonneboiler zelf.</ListItem>
    </List>

    <IntroSituationDescription />

    <Paragraph>
      U kunt deze vergunningcheck gebruiken als u nieuwe zonnepanelen of een
      nieuwe zonneboiler plaatst of als u een bestaande vernieuwt.
    </Paragraph>
  </>
);
