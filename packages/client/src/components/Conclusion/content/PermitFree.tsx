import { Heading, ListItem } from "@amsterdam/asc-ui";
import React from "react";

import { List } from "../../../atoms/index";
import { PERMIT_FREE } from "../../../utils/test-ids";
import {useTranslation} from "react-i18next";

const PermitFree: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Heading forwardedAs="h3" data-testid={PERMIT_FREE}>
        {t('pay attention heading')}
      </Heading>
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
        <ListItem>De gevolgen voor de WOZ-waarde van uw huis.</ListItem>
        <ListItem>Toestemming van de VvE.</ListItem>
      </List>
    </>
  );
}

export default PermitFree;
