import { CompactThemeProvider, Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { DISCLAIMER_TEXT } from "../utils/test-ids";

const Disclaimer: React.FC = () => (
  <CompactThemeProvider>
    <Paragraph data-testid={DISCLAIMER_TEXT} forwardedAs="em" gutterBottom={0}>
      Deze uitkomst is niet definitief. Uit deze vergunningcheck kunt u geen
      rechten halen.
    </Paragraph>
  </CompactThemeProvider>
);

export default Disclaimer;
