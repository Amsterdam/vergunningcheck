import { CompactThemeProvider, Paragraph } from "@amsterdam/asc-ui";
import React, { useState } from "react";

import { DISCLAIMER_TEXT } from "../utils/test-ids";

const Disclaimer: React.FC = () => {
  const [change, setChange] = useState(true);

  return (
    <CompactThemeProvider>
      <div onClick={() => setChange(!change)} style={{ userSelect: "none" }}>
        <Paragraph
          data-testid={DISCLAIMER_TEXT}
          forwardedAs="em"
          gutterBottom={0}
        >
          {change
            ? `Deze uitkomst is niet definitief. Uit deze vergunningcheck kunt u geen
          rechten halen.`
            : `De gemeente Amsterdam doet er alles aan om u juiste informatie te geven. Maar u kunt aan deze uitkomst geen rechten ontlenen. Als u een aanvraag doet, kunt u zekerheid krijgen. `}
        </Paragraph>
      </div>
    </CompactThemeProvider>
  );
};

export default Disclaimer;
