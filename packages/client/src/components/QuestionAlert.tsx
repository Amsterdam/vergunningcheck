import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { HideForPrint } from "../atoms";
import { QUESTION_ALERT } from "../utils/test-ids";
import { QuestionAlertStyle } from "./QuestionAlertStyles";

export type QuestionAlertProps = {
  marginBottom?: number;
  questionNeedsContactExit?: Boolean;
};

const QuestionAlert: React.FC<QuestionAlertProps> = ({
  marginBottom,
  questionNeedsContactExit,
}) => (
  <QuestionAlertStyle data-testid={QUESTION_ALERT} marginBottom={marginBottom}>
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
  </QuestionAlertStyle>
);

export default QuestionAlert;
