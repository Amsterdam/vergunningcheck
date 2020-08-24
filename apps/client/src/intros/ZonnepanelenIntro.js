import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { ListItem, OrderedList } from "../atoms";

export default () => (
  <>
    <Paragraph gutterBottom={12}>
      Met de vergunningcheck kunt u zien wanneer u een omgevingsvergunning nodig
      hebt. U kunt een vergunning nodig hebben voor:
    </Paragraph>
    <OrderedList>
      <ListItem>het wijzigen van een monument.</ListItem>
      <ListItem>het plaatsen van de zonnepanelen of zonneboiler zelf.</ListItem>
    </OrderedList>

    <Paragraph>
      Uw situatie en uw antwoorden bepalen of u een omgevingsvergunning nodig
      hebt. U kunt een antwoord wijzigen. Zo kunt u zien op welke manier u
      misschien toch geen vergunning nodig hebt.
    </Paragraph>
    <Paragraph>
      U kunt deze vergunningcheck gebruiken als u nieuwe zonnepanelen of een
      nieuwe zonneboiler plaatst of als u een bestaande vernieuwt.
    </Paragraph>
  </>
);
