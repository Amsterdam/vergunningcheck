import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import { List, OrderedList, ListItem } from "../../atoms";
import ListInsideOrderedList from "../../components/ListInsideOrderedList";

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
      <ListItem>Wij stellen u een aantal vragen over het gebouw.</ListItem>
      <ListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet.
      </ListItem>
      <ListItem>Wij vertellen u waar u verder op moet letten.</ListItem>
    </OrderedList>

    <Paragraph gutterBottom={8}>
      Deze vergunningcheck kozijn gaat over kozijnen en over gevelpanelen.
      <br />
      Hiervoor kunt u de check gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>U gaat een nieuw kozijn of paneel plaatsen.</ListItem>
      <ListItem>
        U gaat een kozijn of paneel veranderen, vergroten of verkleinen.
      </ListItem>
    </List>

    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <Paragraph>
      Gaat u de woning splitsen of samenvoegen? Neem dan contact op met de
      gemeente: <a href="tel:14020">14 020</a>.
    </Paragraph>
  </>
);
