import { Paragraph } from "@amsterdam/asc-ui";
import { removeQuotes } from "@vergunningcheck/imtr-client";
import React from "react";

import { EditButton, TextToEdit } from "../atoms";
import QuestionAlert from "./QuestionAlert";

type QuestionAnswerProps = {
  disabled?: boolean;
  questionNeedsContactExit?: boolean;
  showQuestionAlert: boolean;
  userAnswer: string;
};

const QuestionAnswer: React.FC<
  QuestionAnswerProps & React.HTMLAttributes<HTMLElement>
> = ({
  disabled,
  onClick,
  questionNeedsContactExit,
  showQuestionAlert,
  userAnswer,
}) => {
  if (!userAnswer) return null;
  return (
    <>
      <Paragraph gutterBottom={0}>
        <TextToEdit>{removeQuotes(userAnswer.toString())}</TextToEdit>
        <EditButton {...{ disabled, onClick }} />
      </Paragraph>
      {showQuestionAlert && (
        <QuestionAlert marginBottom={8} {...{ questionNeedsContactExit }} />
      )}
    </>
  );
};

export default QuestionAnswer;
