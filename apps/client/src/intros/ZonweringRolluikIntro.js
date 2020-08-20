import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem, OrderedList } from "../atoms";

export default () => (
  <>
    <Paragraph>
      Met de vergunningcheck kunt u zien of u voor het plaatsen van zonwering,
      rolhek, rolluik of luik één of meer omgevingsvergunningen nodig hebt. Er
      zijn 2 soorten vergunningen:
    </Paragraph>
    <OrderedList>
      <ListItem>
        Een vergunning voor het wijzigen van een monument: ‘wijzigen monument’.
      </ListItem>
      <ListItem>
        Een vergunning voor het plaatsen van de zonwering, het rolhek, rolluik
        of luik zelf: ‘zonwering, rolhek, rolluik of luik plaatsen’.
      </ListItem>
    </OrderedList>

    <Paragraph>
      Het hangt af van uw antwoorden en situatie of u een vergunning nodig hebt.
      U kunt een antwoord wijzigen. Zo kunt u zien op welke manier u misschien
      toch geen vergunning nodig hebt.
    </Paragraph>
    <Paragraph>
      U kunt deze vergunningcheck gebruiken als u een nieuwe zonwering, rolhek,
      rolluik of luik plaatst of als u een bestaande vernieuwt.
    </Paragraph>

    <Heading forwardedAs="h4">Uitzonderingen:</Heading>
    <Paragraph>
      In de volgende situaties is het niet mogelijk de vergunningcheck te
      gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het deel van het gebouw waarin de zonwering, het rolhek, rolluik of luik
        komt, is zonder vergunning gebouwd.
      </ListItem>
    </List>
    <Paragraph>
      Bel in een van deze situaties de gemeente op{" "}
      <a href="tel:14020">14 020</a>, maandag tot en met vrijdag van 08.00 uur
      tot 18.00 uur.
    </Paragraph>
  </>
);
