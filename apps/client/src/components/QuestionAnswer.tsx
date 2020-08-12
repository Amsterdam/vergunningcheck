import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import EditButton from "../atoms/EditButton";
import { removeQuotes } from "../utils";
import PermitAlert from "./PermitAlert";

type QuestionAnswerProps = {
  onClick: Function;
  questionNeedsPermit: Boolean;
  userAnswer: string;
};

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  onClick,
  questionNeedsPermit,
  userAnswer,
}) => {
  return (
    <>
      <Paragraph gutterBottom={0}>
        {removeQuotes(userAnswer)}
        <EditButton onClick={onClick} />
      </Paragraph>
      {questionNeedsPermit && <PermitAlert />}
    </>
  );
};

export default QuestionAnswer;
