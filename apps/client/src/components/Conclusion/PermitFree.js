import { Heading, ListItem } from "@datapunt/asc-ui";
import React from "react";
import { isIE, isMobile } from "react-device-detect";

import { List } from "../../atoms";
import { HideForPrint, PrintButton } from "../../atoms";

const PermitFree = ({ handlePrintButton, contactConclusion }) => {
  return (
    <>
      <Heading forwardedAs="h2">U hebt geen omgevingsvergunning nodig.</Heading>
      <HideForPrint>
        {!isIE && !isMobile && (
          <PrintButton
            variant="textButton"
            onClick={handlePrintButton}
            marginTop={contactConclusion && 5}
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
      </List>
    </>
  );
};

export default PermitFree;
