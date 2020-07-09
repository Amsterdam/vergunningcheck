import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { INTRO } from "../utils/test-ids";

export default () => (
  <Paragraph data-testid={INTRO}>Some debug intro</Paragraph>
);
