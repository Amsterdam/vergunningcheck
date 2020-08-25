import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import {
  IntroHeading,
  IntroSituationDescription,
  List,
  ListItem,
} from "../atoms";

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
