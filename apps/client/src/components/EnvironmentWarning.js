import React from "react";

import { Alert } from "../atoms";
import { Paragraph } from "@datapunt/asc-ui";

export default () => (
  <Alert level="attention">
    {/* gutterBottom doesn'tWorkForMe:( */}
    <Paragraph gutterBottom={30}>
      Let op; u kijkt naar een test-versie van vergunningcheck Amsterdam... Bent
      u hier per ongeluk ....
      <a
        href="https://www.amsterdam.nl/contact/"
        target="_blank"
        rel="noopener noreferrer"
        title="Contactgegevens en openingstijden"
      >
        Neem contact op...
      </a>
    </Paragraph>
  </Alert>
);
