import { CompactThemeProvider, Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { DISCLAIMER_TEXT } from "../utils/test-ids";

const Disclaimer: React.FC = () => (
  <CompactThemeProvider>
    <Paragraph data-testid={DISCLAIMER_TEXT} forwardedAs="em" gutterBottom={0}>
      De gemeente Amsterdam doet er alles aan om u juiste informatie te geven.
      Maar u kunt aan deze uitkomst geen rechten ontlenen. Als u een aanvraag
      doet, kunt u zekerheid krijgen.
    </Paragraph>
  </CompactThemeProvider>
);

export default Disclaimer;
