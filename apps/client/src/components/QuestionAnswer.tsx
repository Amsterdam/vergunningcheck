import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import EditButton from "../atoms/EditButton";
import { removeQuotes } from "../utils";
import PermitAlert from "./PermitAlert";

type QuestionAnswerProps = {
  hideEditButton?: Boolean;
  questionNeedsPermit: Boolean;
  userAnswer: string;
};

const QuestionAnswer: React.FC<
  QuestionAnswerProps & React.HTMLAttributes<HTMLElement>
> = ({ hideEditButton, questionNeedsPermit, onClick, userAnswer }) => {
  return (
    <>
      <Paragraph gutterBottom={0}>
        {removeQuotes(userAnswer)}
        {!hideEditButton && <EditButton {...{ onClick }} />}
      </Paragraph>
      {questionNeedsPermit && <PermitAlert />}
    </>
  );
};

export default QuestionAnswer;
