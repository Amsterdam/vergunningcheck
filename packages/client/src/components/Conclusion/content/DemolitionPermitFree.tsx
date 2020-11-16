import { Heading, ListItem } from "@amsterdam/asc-ui";
import React from "react";

import { List } from "../../../atoms/index";
import { PERMIT_FREE } from "../../../utils/test-ids";
import {useTranslation} from "react-i18next";

// @DONE: Insert correct texts (robin)
// @TODO: Fix URL (sven)
// @TODO: Fix translations (sven)
// @TODO: Verify texts (robin)

const DemolitionPermitFree: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Heading forwardedAs="h3" data-testid={PERMIT_FREE}>
        {t('outcome.common.pay attention heading')}
      </Heading>
      <List variant="bullet">
        <ListItem>
          {t('outcome.common.permit free demolition exception')}
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
        <ListItem>Het risico dat u toch asbest tegenkomt.</ListItem>
        <ListItem>Toestemming van de VvE.</ListItem>
        <ListItem>
          Toestemming van uw buren als het gaat om een gezamenlijke muur of
          schutting.
        </ListItem>
      </List>
    </>
  );
}

export default DemolitionPermitFree;
