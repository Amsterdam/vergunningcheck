import { Paragraph } from "@amsterdam/asc-ui";
import { imtrOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import { HideForPrint } from "../atoms";
import { QUESTION_ALERT } from "../utils/test-ids";
import { QuestionAlertStyle } from "./QuestionAlertStyles";

export type QuestionAlertProps = {
  marginBottom?: number;
  outcomeType: string;
};

const QuestionAlert: React.FC<QuestionAlertProps> = ({
  marginBottom,
  outcomeType,
}) => (
  <QuestionAlertStyle data-testid={QUESTION_ALERT} marginBottom={marginBottom}>
    <Paragraph>
      {outcomeType === imtrOutcomes.NEED_PERMIT && (
        <>
          Door dit antwoord hebt u een vergunning nodig.{" "}
          <HideForPrint as="span">
            Als u een andere keuze maakt, hebt u misschien geen vergunning
            nodig.
          </HideForPrint>
        </>
      )}
      {outcomeType === imtrOutcomes.NEED_CONTACT &&
        "Door dit antwoord kunnen we niet vaststellen of u een vergunning nodig hebt."}
      {outcomeType === imtrOutcomes.NEED_REPORT &&
        "Door dit antwoord heb je een meldingplicht (TEXT NOG UPDATEN!)."}
    </Paragraph>
  </QuestionAlertStyle>
);

export default QuestionAlert;
