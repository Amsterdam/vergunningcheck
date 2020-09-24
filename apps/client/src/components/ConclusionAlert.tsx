import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { HideForPrint } from "../atoms";
import { ConclusionAlertStyle } from "./ConclusionAlertStyles";

const ConclusionAlert: React.FC<
  { questionNeedsContactExit?: Boolean } & React.HTMLAttributes<HTMLElement>
> = ({ questionNeedsContactExit, ...otherProps }) => (
  <ConclusionAlertStyle {...otherProps}>
    <Paragraph>
      {questionNeedsContactExit ? (
        "Door dit antwoord kunnen we niet vaststellen of u een vergunning nodig hebt."
      ) : (
        <>
          Door dit antwoord hebt u een vergunning nodig.{" "}
          <HideForPrint as="span">
            Als u een andere keuze maakt, hebt u misschien geen vergunning
            nodig.
          </HideForPrint>
        </>
      )}
    </Paragraph>
  </ConclusionAlertStyle>
);

export default ConclusionAlert;
