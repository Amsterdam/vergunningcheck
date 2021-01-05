import { Paragraph } from "@amsterdam/asc-ui";
import { ClientOutcomes, removeQuotes } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent, HTMLAttributes } from "react";

import { EditButton, TextToEdit } from "../../atoms";
import { QuestionAlert } from "./";

type QuestionAnswerProps = {
  disabled?: boolean;
  outcomeType: ClientOutcomes;
  questionNeedsContactExit?: boolean;
  showQuestionAlert: boolean;
  userAnswer?: string;
};

const QuestionAnswer: FunctionComponent<
  QuestionAnswerProps & HTMLAttributes<HTMLElement>
> = ({ disabled, onClick, outcomeType, showQuestionAlert, userAnswer }) => {
  if (!userAnswer) return null;
  return (
    <>
      <Paragraph gutterBottom={0}>
        <TextToEdit>{removeQuotes(userAnswer.toString())}</TextToEdit>
        <EditButton {...{ disabled, onClick }} />
      </Paragraph>
      {showQuestionAlert && (
        <QuestionAlert marginBottom={8} {...{ outcomeType }} />
      )}
    </>
  );
};

export default QuestionAnswer;
