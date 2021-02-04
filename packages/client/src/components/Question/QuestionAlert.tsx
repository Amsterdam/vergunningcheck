import { Paragraph } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Alert, HideForPrint } from "../../atoms";
import { QUESTION_ALERT } from "../../utils/test-ids";

export type QuestionAlertProps = {
  marginBottom?: number;
  outcomeType: ClientOutcomes;
};

const { NEED_CONTACT, NEED_PERMIT } = ClientOutcomes;

const QuestionAlert: FunctionComponent<QuestionAlertProps> = ({
  marginBottom,
  outcomeType,
}) => {
  const { t } = useTranslation();

  // Only show this Alert for select outcomes
  if (outcomeType === NEED_PERMIT || outcomeType === NEED_CONTACT) {
    return (
      <Alert
        data-testid={QUESTION_ALERT}
        level="warning"
        marginBottom={marginBottom}
      >
        <Paragraph>
          {outcomeType === NEED_PERMIT && (
            <>
              {t("question.alert.this answer causes a need for permit")}{" "}
              <HideForPrint as="span">
                {t(
                  "question.alert.if you make another choice you might not need a permit"
                )}
              </HideForPrint>
            </>
          )}
          {outcomeType === NEED_CONTACT &&
            t(
              "question.alert.this anwser makes it unable to determine the outcome"
            )}
        </Paragraph>
      </Alert>
    );
  }
  return null;
};

export default QuestionAlert;
