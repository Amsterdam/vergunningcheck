import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";

import { Alert, HideForPrint } from "../atoms";
import { QUESTION_ALERT } from "../utils/test-ids";

type QuestionAlertProps = {
  marginBottom?: number;
  questionNeedsContactExit?: Boolean;
};

const QuestionAlert: FunctionComponent<QuestionAlertProps> = ({
  marginBottom,
  questionNeedsContactExit,
}) => (
  <Alert
    data-testid={QUESTION_ALERT}
    level="warning"
    marginBottom={marginBottom}
  >
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
  </Alert>
);

export default QuestionAlert;
