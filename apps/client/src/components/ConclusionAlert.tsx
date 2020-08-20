import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { ConclusionAlertStyle } from "./ConclusionAlertStyles";

const ConclusionAlert: React.FC<
  { questionNeedsContactExit?: Boolean } & React.HTMLAttributes<HTMLElement>
> = ({ questionNeedsContactExit }) => (
  <ConclusionAlertStyle>
    <Paragraph>
      {questionNeedsContactExit
        ? "Door dit antwoord kunnen we niet vaststellen of u een vergunning nodig hebt. Klik op Volgende."
        : "Door dit antwoord hebt u een vergunning nodig. Als u een andere keuze maakt hebt u misschien geen vergunning nodig."}
    </Paragraph>
  </ConclusionAlertStyle>
);

export default ConclusionAlert;
