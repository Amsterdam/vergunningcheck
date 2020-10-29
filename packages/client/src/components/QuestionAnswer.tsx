import { Paragraph } from "@amsterdam/asc-ui";
import React from "react";

import { EditButton, TextToEdit } from "../atoms";
import QuestionAlert from "../atoms/QuestionAlert";
import { removeQuotes } from "../utils";

type QuestionAnswerProps = {
  disabled: boolean;
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
  return (
    <>
      <Paragraph gutterBottom={0}>
        <TextToEdit>{removeQuotes(userAnswer)}</TextToEdit>
        <EditButton {...{ disabled, onClick }} />
      </Paragraph>
      {showQuestionAlert && (
        <QuestionAlert marginBottom={8} {...{ questionNeedsContactExit }} />
      )}
    </>
  );
};

export default QuestionAnswer;
