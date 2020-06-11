import React from "react";

import { Paragraph } from "@datapunt/asc-ui";

import { INTRO } from "../utils/test-ids";

export default () => (
  <Paragraph data-testid={INTRO}>Some debug intro</Paragraph>
);
