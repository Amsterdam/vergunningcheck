import { Paragraph } from "@amsterdam/asc-ui";
import { ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { GraphQLTopic } from "../../types";
import { Alert, HideForPrint } from "../../atoms";
import { useTopic } from "../../hooks";
import { QUESTION_ALERT } from "../../utils/test-ids";

export type QuestionAlertProps = {
  marginBottom?: number;
  questionAlertText?: string;
  outcomeType?: ClientOutcomes;
};

const { NEED_CONTACT, NEED_PERMIT } = ClientOutcomes;

const QuestionAlert: FunctionComponent<QuestionAlertProps> = ({
  marginBottom,
  questionAlertText,
  outcomeType,
}) => {
  const { userMightNotNeedPermit } = useTopic() as GraphQLTopic;
  const { t } = useTranslation();

  const imtrOutcome =
    outcomeType === NEED_PERMIT || outcomeType === NEED_CONTACT;

  // Only show this Alert for valid outcomes
  const validOutcome =
    (imtrOutcome && !questionAlertText) || (questionAlertText && !imtrOutcome);

  if (validOutcome) {
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
              {userMightNotNeedPermit && (
                <HideForPrint as="span">
                  {t(
                    "question.alert.if you make another choice you might not need a permit"
                  )}
                </HideForPrint>
              )}
            </>
          )}
          {outcomeType === NEED_CONTACT &&
            t(
              "question.alert.this anwser makes it unable to determine the outcome"
            )}
          {questionAlertText}
        </Paragraph>
      </Alert>
    );
  }
  return null;
};

export default QuestionAlert;
