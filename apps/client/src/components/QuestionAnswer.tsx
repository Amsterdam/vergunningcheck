import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { removeQuotes } from "../utils";
import PermitAlert from "./PermitAlert";
import { EditQuestionButton } from "./QuestionAnswerStyles";

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

        <EditQuestionButton onClick={() => onClick()} variant="textButton">
          Wijzig
        </EditQuestionButton>
      </Paragraph>
      {questionNeedsPermit && <PermitAlert />}
    </>
  );
};

export default QuestionAnswer;
