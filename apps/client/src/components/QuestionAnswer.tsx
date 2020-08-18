import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import EditButton from "../atoms/EditButton";
import { removeQuotes } from "../utils";
import ConclusionAlert from "./ConclusionAlert";

type QuestionAnswerProps = {
  editDisabled: boolean;
  questionNeedsContactExit?: boolean;
  showConclusionAlert: boolean;
  userAnswer: string;
};

const QuestionAnswer: React.FC<
  QuestionAnswerProps & React.HTMLAttributes<HTMLElement>
> = ({
  editDisabled,
  onClick,
  questionNeedsContactExit,
  showConclusionAlert,
  userAnswer,
}) => {
  return (
    <>
      <Paragraph gutterBottom={0}>
        {removeQuotes(userAnswer)}
        <EditButton {...{ editDisabled, onClick }} />
      </Paragraph>
      {showConclusionAlert && (
        <ConclusionAlert {...{ questionNeedsContactExit }} />
      )}
    </>
  );
};

export default QuestionAnswer;
