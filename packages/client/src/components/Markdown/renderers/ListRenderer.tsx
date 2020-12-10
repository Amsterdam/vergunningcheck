import React, { FunctionComponent } from "react";

import { List } from "../../../atoms";

const ListRenderer: FunctionComponent = ({ children }) => (
  <List variant="bullet">{children}</List>
);

export default ListRenderer;
