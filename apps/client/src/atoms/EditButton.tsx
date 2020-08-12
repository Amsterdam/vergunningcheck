import React from "react";

import { EditQuestionButton } from "./EditButtonStyle";

const QuestionAnswer: React.FC<{ onClick: Function }> = ({ onClick }) => (
  <EditQuestionButton onClick={() => onClick()} variant="textButton">
    Wijzig
  </EditQuestionButton>
);

export default QuestionAnswer;
