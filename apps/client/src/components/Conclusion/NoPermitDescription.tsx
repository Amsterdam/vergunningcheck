import { Heading, ListItem, Paragraph } from "@datapunt/asc-ui";
import React from "react";
import { useParams } from "react-router-dom";

import { List } from "../../atoms/index";
import { topics } from "../../config";

export const NoPermitDescription = () => {
  const { slug } = useParams();
  const topic = topics.find((t) => t.slug === slug);
  return (
    <>
      <Paragraph>
        U hebt geen vergunning nodig voor {topic?.name.toLowerCase()}. Wél moet
        u op een aantal dingen letten voordat u gaat beginnen. Uw aannemer kan u
        daarbij helpen.
      </Paragraph>
      <Heading forwardedAs="h3">Dit is waar u verder op moet letten:</Heading>
      <List variant="bullet">
        <ListItem>
          U moet voldoen aan de eisen van het Bouwbesluit. In het Bouwbesluit
          staan ook eisen voor de brandveiligheid.
        </ListItem>
        <ListItem>
          U moet rekening houden met beschermde flora en fauna. Bijvoorbeeld een
          nest zwaluwen onder de dakpannen.
        </ListItem>
      </List>
      <Heading forwardedAs={"h3"}>Denk ook aan:</Heading>
      <List variant={"bullet"}>
        <ListItem>
          Het plaatsen van een hijskraan of container op straat of het
          reserveren van een parkeervak.
        </ListItem>
        <ListItem>Het afvoeren van bouw- en sloopafval.</ListItem>
        <ListItem>Het risico dat u asbest tegenkomt.</ListItem>
        <ListItem>
          Het burenrecht. Denk hierbij bijvoorbeeld aan uitzicht op het terrein
          van de buren.
        </ListItem>
        <ListItem>
          De gevolgen van het plaatsen van een kozijn voor de WOZ-waarde van uw
          huis.
        </ListItem>
        <ListItem>Toestemming van de VvE.</ListItem>
      </List>
    </>
  );
};
