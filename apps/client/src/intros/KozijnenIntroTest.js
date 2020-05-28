import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import { List, ListItem } from "../components/Atoms";

export default () => (
  <>
    <Heading forwardedAs="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>
      U wilt weten of u een vergunning nodig hebt om kozijnen te plaatsen of te
      vervangen.
    </Paragraph>
    <List variant="bullet">
      <ListItem>U voert eerst het adres van het gebouw in.</ListItem>
      <ListItem>
        Vervolgens krijgt u informatie over het gebouw te zien.
      </ListItem>
    </List>

    <Paragraph gutterBottom={8}>
      U kunt de vergunningcheck kozijn gebruiken voor
    </Paragraph>
    <List variant="bullet">
      <ListItem>het plaatsen van kozijnen</ListItem>
      <ListItem>het veranderen, vergroten of verkleinen van kozijnen</ListItem>
      <ListItem>het plaatsen van een gevelpaneel</ListItem>
      <ListItem>
        het veranderen, vergroten of verkleinen van een gevelpaneel
      </ListItem>
    </List>
  </>
);
