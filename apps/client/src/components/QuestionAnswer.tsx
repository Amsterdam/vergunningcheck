import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import { removeQuotes } from "../utils";
import { EditQuestionButton } from "./QuestionAnswerStyles";
import QuestionNeedsPermit from "./QuestionNeedsPermit";

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
      {questionNeedsPermit && <QuestionNeedsPermit />}
    </>
  );
};

export default QuestionAnswer;
