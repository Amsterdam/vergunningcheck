import { Heading } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem, OrderedList } from "../atoms";
import ListInsideOrderedList from "../components/ListInsideOrderedList";

export default () => (
  <>
    <Heading forwardedAs="h3">Hoe het werkt:</Heading>
    <OrderedList>
      <ListItem>
        U voert op de volgende pagina eerst het adres van het gebouw in.
      </ListItem>
      <ListItem>
        Vervolgens krijgt u te zien:
        <ListInsideOrderedList variant="bullet">
          <ListItem>of het gebouw een monument is.</ListItem>
          <ListItem>
            of het gebouw in een beschermd stads- of dorpsgezicht ligt.
          </ListItem>
          <ListItem>welk bestemmingsplan er geldt.</ListItem>
        </ListInsideOrderedList>
      </ListItem>
      <ListItem>
        Wij stellen u een aantal vragen over het gebouw en de dakkapel.
      </ListItem>
      <ListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet.
      </ListItem>
      <ListItem>
        Wij vertellen u waar u verder op moet letten als u de dakkapel gaat
        plaatsen.
      </ListItem>
    </OrderedList>

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
