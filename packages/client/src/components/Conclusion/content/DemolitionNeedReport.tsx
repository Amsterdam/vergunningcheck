import { Heading, ListItem } from "@amsterdam/asc-ui";
import React from "react";

import { List } from "../../../atoms/index";
import { NEED_REPORT } from "../../../utils/test-ids";

// @DONE: Insert correct texts (robin)
// @TODO: Fix URL (sven)
// @TODO: Fix translations (sven)
// @TODO: Verify texts (robin)

const DemolitionNeedReport: React.FC = () => (
  <>
    <Heading forwardedAs="h3" data-testid={NEED_REPORT}>
      Dit is waar u verder op moet letten:
    </Heading>
    <List variant="bullet">
      <ListItem>
        Misschien staat in het bestemmingsplan dat een vergunning toch nodig is.
        Lees hiervoor verder op de pagina Bestemmingsplan bekijken.
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
      <ListItem>Toestemming van de VvE.</ListItem>
      <ListItem>
        Toestemming van uw buren als het gaat om een gezamenlijke muur of
        schutting.
      </ListItem>
    </List>
  </>
);

export default DemolitionNeedReport;
