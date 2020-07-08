import { Heading, Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { List, ListItem, OrderedList } from "../../atoms";
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
      De vergunningcheck kozijn gaat over kozijnen, deuren, ramen en panelen.
      Voor deze situaties kunt u de vergunningcheck gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>
        U gaat een nieuw kozijn, deur, raam of paneel plaatsen.
      </ListItem>
      <ListItem>
        U gaat een bestaand kozijn, deur, raam of paneel vervangen of
        veranderen.
      </ListItem>
    </List>

    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <Paragraph gutterBottom={8}>
      Voor deze situaties kunt u de vergunningcheck niet gebruiken:
    </Paragraph>
    <List variant="bullet">
      <ListItem>Het aantal woningen verandert.</ListItem>
      <ListItem>
        Het deel van het gebouw waarin het kozijn komt, is zonder vergunning
        gebouwd.
      </ListItem>
    </List>
    <Paragraph gutterBottom={8}>
      Hebt u een vraag of twijfelt u? Bel dan de gemeente op{" "}
      <a href="tel:14020">14 020</a>, maandag tot en met vrijdag van 08.00 uur
      tot 18.00 uur.
    </Paragraph>
  </>
);
