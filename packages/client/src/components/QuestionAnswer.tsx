import { Paragraph } from "@amsterdam/asc-ui";
import { removeQuotes } from "imtr_client";
import React from "react";

import { EditButton, TextToEdit } from "../atoms";
import ConclusionAlert from "./ConclusionAlert";

type QuestionAnswerProps = {
  disabled: boolean;
  questionNeedsContactExit?: boolean;
  showConclusionAlert: boolean;
  userAnswer: string;
};

const QuestionAnswer: React.FC<
  QuestionAnswerProps & React.HTMLAttributes<HTMLElement>
> = ({
  disabled,
  onClick,
  questionNeedsContactExit,
  showConclusionAlert,
  userAnswer,
}) => {
  return (
    <>
      <Paragraph gutterBottom={0}>
        <TextToEdit>{removeQuotes(userAnswer)}</TextToEdit>
        <EditButton {...{ disabled, onClick }} />
      </Paragraph>
      {showConclusionAlert && (
        <ConclusionAlert marginBottom={8} {...{ questionNeedsContactExit }} />
      )}
    </>
  );
};

export default QuestionAnswer;
