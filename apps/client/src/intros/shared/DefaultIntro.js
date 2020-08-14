import { Heading } from "@datapunt/asc-ui";
import React from "react";

import { ListItem, OrderedList } from "../../atoms";

export default () => (
  <>
    <Heading forwardedAs="h3">Hoe het werkt:</Heading>
    <OrderedList>
      <ListItem>... </ListItem>
      <ListItem>Wij stellen u een aantal vragen over ....</ListItem>
      <ListItem>
        U leest of u een vergunning nodig hebt. Wij vertellen u hoe u een
        aanvraag doet.
      </ListItem>
      <ListItem>Wij vertellen u waar u verder op moet letten.</ListItem>
    </OrderedList>
  </>
);
