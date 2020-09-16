import { Heading, ListItem } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { List } from "../../atoms";
import { HideForPrint, PrintButton } from "../../atoms";

type Props = {
  contactConclusion: object;
  handlePrintButton: () => void;
};

export const PermitFree: React.FC<
  Props & React.HTMLAttributes<HTMLElement>
> = ({ contactConclusion, handlePrintButton }) => (
  <>
    <Heading forwardedAs="h2">U hebt geen omgevingsvergunning nodig.</Heading>
    <HideForPrint>
      {!isIE && !isMobile && (
        <PrintButton
          marginTop={contactConclusion && 5}
          onClick={handlePrintButton}
          variant="textButton"
        >
          Conclusie opslaan
        </PrintButton>
      )}
    </HideForPrint>
    <Heading forwardedAs="h3">Waar u verder op moet letten:</Heading>
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
        Het plaatsen van een hijskraan of container op straat of het reserveren
        van een parkeervak.
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
    </List>
  </>
);
