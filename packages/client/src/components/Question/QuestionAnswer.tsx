import { Paragraph } from "@amsterdam/asc-ui";
import { Answer, ClientOutcomes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent, HTMLAttributes } from "react";

import { EditButton, TextToEdit } from "../../atoms";
import { getAnswerLabel } from "../../utils";
import QuestionAlert from "./QuestionAlert";

type QuestionAnswerProps = {
  answer?: Answer;
  disabled?: boolean;
  outcomeType?: ClientOutcomes;
  questionAlertText?: string;
  questionNeedsContactExit?: boolean;
  showQuestionAlert?: boolean;
};

const QuestionAnswer: FunctionComponent<
  QuestionAnswerProps & HTMLAttributes<HTMLElement>
> = ({
  answer,
  disabled,
  onClick,
  questionAlertText,
  outcomeType,
  showQuestionAlert,
}) => {
  // Don't render when there's no answer
  if (answer === undefined) return null;

  return (
    <>
      <Paragraph gutterBottom={0}>
        <TextToEdit>{getAnswerLabel(answer)}</TextToEdit>
        <EditButton {...{ disabled, onClick }} />
      </Paragraph>
      {showQuestionAlert && (
        <QuestionAlert
          marginBottom={8}
          {...{ questionAlertText, outcomeType }}
        />
      )}
    </>
  );
};

export default QuestionAnswer;
