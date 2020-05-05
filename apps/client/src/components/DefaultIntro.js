import React from "react";
import { Heading, Paragraph } from "@datapunt/asc-ui";
import { List, ListItem } from "../components/Atoms";

export default ({ children }) => (
  <>
    <Heading forwardedAs="h3">Hoe werkt het?</Heading>
    <Paragraph gutterBottom={8}>{children}</Paragraph>
    <List variant="bullet">
      <ListItem>U voert eerst het adres van het gebouw in.</ListItem>
      <ListItem>
        Vervolgens krijgt u informatie over het gebouw te zien.
      </ListItem>
      <ListItem>
        U gebruikt deze informatie om de vergunningcheck te doen op het
        Omgevingsloket.
      </ListItem>
    </List>
  </>
);
