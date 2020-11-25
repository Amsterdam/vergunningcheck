import { Paragraph } from "@amsterdam/asc-ui";
import { clientOutcomes } from "@vergunningcheck/imtr-client";
import React from "react";
import { useTranslation } from "react-i18next";

import { HideForPrint } from "../atoms";
import { QUESTION_ALERT } from "../utils/test-ids";
import { QuestionAlertStyle } from "./QuestionAlertStyles";

export type QuestionAlertProps = {
  marginBottom?: number;
  outcomeType: string;
};

const { NEED_CONTACT, NEED_PERMIT } = clientOutcomes;

const QuestionAlert: React.FC<QuestionAlertProps> = ({
  marginBottom,
  outcomeType,
}) => {
  const { t } = useTranslation();

  // Only show this Alert for select outcomes
  if (outcomeType === NEED_PERMIT || outcomeType === NEED_CONTACT) {
    return (
      <QuestionAlertStyle
        data-testid={QUESTION_ALERT}
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
      </QuestionAlertStyle>
    );
  }
  return null;
};

export default QuestionAlert;
