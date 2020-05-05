import React from "react";
import { Heading, Paragraph, OrderedList } from "@datapunt/asc-ui";
import { ListItem } from "../components/Atoms";
import ListInsideOrderedList from "../components/ListInsideOrderedList";

export default () => (
  <>
    <Paragraph gutterBottom={20}>
      U kunt deze vergunningcheck gebruiken voor zonnepanelen en zonneboiler.
    </Paragraph>
    <Heading $as="h3">Hoe het werkt:</Heading>
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
        Wij stellen u een aantal vragen over het gebouw en de zonnepanelen of de
        zonneboiler.
      </ListItem>
      <ListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet.
      </ListItem>
      <ListItem>
        Wij vertellen u waar u verder op moet letten als u de zonnepanelen of
        zonneboiler gaat plaatsen.
      </ListItem>
    </OrderedList>
  </>
);
