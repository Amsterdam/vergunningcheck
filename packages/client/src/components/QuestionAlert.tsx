import { Paragraph } from "@amsterdam/asc-ui";
import { clientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";

import { HideForPrint } from "../atoms";
import { QUESTION_ALERT } from "../utils/test-ids";
import { QuestionAlertStyle } from "./QuestionAlertStyles";

export type QuestionAlertProps = {
  marginBottom?: number;
  outcomeType: string;
};

const { NEED_CONTACT, NEED_PERMIT, NEED_REPORT } = clientOutcomes;

// @TODO: get this text from i18n

const QuestionAlert: React.FC<QuestionAlertProps> = ({
  marginBottom,
  outcomeType,
}) => (
  <QuestionAlertStyle data-testid={QUESTION_ALERT} marginBottom={marginBottom}>
    <Paragraph>
      {outcomeType === NEED_PERMIT && (
        <>
          Door dit antwoord hebt u een vergunning nodig.{" "}
          <HideForPrint as="span">
            Als u een andere keuze maakt, hebt u misschien geen vergunning
            nodig.
          </HideForPrint>
        </>
      )}
      {outcomeType === NEED_CONTACT &&
        "Door dit antwoord kunnen we niet vaststellen of u een vergunning nodig hebt."}
      {outcomeType === NEED_REPORT &&
        "Door dit antwoord heb je een meldingplicht (TEXT NOG UPDATEN!)."}
    </Paragraph>
  </QuestionAlertStyle>
);

export default QuestionAlert;
