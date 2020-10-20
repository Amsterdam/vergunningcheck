import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { HideForPrint } from "../atoms";
import { ConclusionAlertStyle } from "./ConclusionAlertStyles";

export type ConclusionAlertProps = {
  marginBottom?: number;
  questionNeedsContactExit?: Boolean;
};

const ConclusionAlert: React.FC<ConclusionAlertProps> = ({
  marginBottom,
  questionNeedsContactExit,
}) => (
  <ConclusionAlertStyle marginBottom={marginBottom}>
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
