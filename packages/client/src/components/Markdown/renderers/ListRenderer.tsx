import React from "react";

import { List } from "../../../atoms";

const ListRenderer: React.FC = ({ children }) => (
  <List variant="bullet">{children}</List>
);

export default ListRenderer;
