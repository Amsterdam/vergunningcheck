import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import EditButton from "../atoms/EditButton";
import { removeQuotes } from "../utils";
import PermitAlert from "./PermitAlert";

type QuestionAnswerProps = {
  editDisabled: boolean;
  questionNeedsPermit: boolean;
  userAnswer: string;
};

const QuestionAnswer: React.FC<
  QuestionAnswerProps & React.HTMLAttributes<HTMLElement>
> = ({ editDisabled, questionNeedsPermit, onClick, userAnswer }) => {
  return (
    <>
      <Paragraph gutterBottom={0}>
        {removeQuotes(userAnswer)}
        <EditButton {...{ editDisabled, onClick }} />
      </Paragraph>
      {questionNeedsPermit && <PermitAlert />}
    </>
  );
};

export default QuestionAnswer;
