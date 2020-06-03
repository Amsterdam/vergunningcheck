import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import { List, OrderedList, ListItem } from "../../atoms";
import ListInsideOrderedList from "../../components/ListInsideOrderedList";
import illustration from "./illustration.png";
import { Pair, Illustration } from "./StyledKozijnenIntroSTTR";

export default () => (
  <>
    <Heading forwardedAs="h3">Hoe werkt het?</Heading>
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
      <ListItem>
        Vervolgens krijgt u informatie over het gebouw te zien.
      </ListItem>
    </OrderedList>

    <Paragraph gutterBottom={8}>
      U kunt de vergunningcheck kozijn gebruiken voor:
    </Paragraph>
    <List variant="bullet">
      <ListItem>het plaatsen van kozijnen</ListItem>
      <ListItem>het veranderen, vergroten of verkleinen van kozijnen</ListItem>
      <ListItem>het plaatsen van een paneel in een kozijn</ListItem>
      <ListItem>
        het veranderen, vergroten of verkleinen van een paneel in een kozijn
      </ListItem>
    </List>

    <Pair>
      <Illustration
        src={illustration}
        alt="Afbeelding met voorbeelden van verschillende kozijnen"
      />
      <OrderedList>
        <ListItem>Kozijn</ListItem>
        <ListItem>Raam, vast glas</ListItem>
        <ListItem>Deur</ListItem>
        <ListItem>Paneel</ListItem>
      </OrderedList>
    </Pair>

    <Heading forwardedAs="h4">Bijzondere situaties:</Heading>
    <List variant="bullet">
      <ListItem>
        Gaat u de woning splitsen of samenvoegen? Neem contact op met de
        gemeente op telefoonnummer <a href="tel:14020">14 020</a>.
      </ListItem>
    </List>
  </>
);
