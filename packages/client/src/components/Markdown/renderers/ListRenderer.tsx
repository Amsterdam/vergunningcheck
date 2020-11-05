import React from "react";

import { List } from "../../../atoms";

export default ({ children }: { children: React.ReactChildren }) => (
  <List variant="bullet">{children}</List>
);
