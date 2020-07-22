import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import LocationIntro from "./shared/LocationIntro";

export default () => (
  <>
    <Paragraph gutterBottom={20}>
      U kunt deze vergunningcheck gebruiken voor zonnepanelen en zonneboiler.
    </Paragraph>

    <LocationIntro />
  </>
);
