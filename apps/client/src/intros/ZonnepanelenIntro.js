import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { ListItem, OrderedList } from "../atoms";

export default () => (
  <>
    <Paragraph>
      Met de vergunningcheck kunt u zien of u voor het plaatsen van zonnepanelen
      of een zonneboiler één of meer omgevingsvergunningen nodig hebt. Er zijn 2
      soorten vergunningen:
    </Paragraph>
    <OrderedList>
      <ListItem>
        Een vergunning voor het wijzigen van een monument: ‘wijzigen monument’.
      </ListItem>
      <ListItem>
        Een vergunning voor het plaatsen van de zonnepanelen of zonneboiler
        zelf: ‘zonnepanelen of zonneboiler plaatsen’.
      </ListItem>
    </OrderedList>

    <Paragraph>
      Het hangt af van uw antwoorden en situatie of u een vergunning nodig hebt.
      U kunt een antwoord wijzigen. Zo kunt u zien op welke manier u misschien
      toch geen vergunning nodig hebt.
    </Paragraph>

    <Paragraph>
      U kunt deze vergunningcheck gebruiken als u nieuwe zonnepanelen of een
      nieuwe zonneboiler plaatst of als u een bestaande vernieuwt.
    </Paragraph>
  </>
);
