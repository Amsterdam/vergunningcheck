import { Paragraph } from "@datapunt/asc-ui";
import React from "react";

import EditButton from "../atoms/EditButton";
import { removeQuotes } from "../utils";
import ConclusionAlert from "./ConclusionAlert";

type QuestionAnswerProps = {
  hideEditButton?: Boolean;
  questionNeedsContactExit?: Boolean;
  showConclusionAlert: Boolean;
  userAnswer: string;
};

const QuestionAnswer: React.FC<
  QuestionAnswerProps & React.HTMLAttributes<HTMLElement>
> = ({
  hideEditButton,
  questionNeedsContactExit,
  showConclusionAlert,
  onClick,
  userAnswer,
}) => {
  return (
    <>
      <Paragraph gutterBottom={0}>
        {removeQuotes(userAnswer)}
        {!hideEditButton && <EditButton {...{ onClick }} />}
      </Paragraph>
      {showConclusionAlert && (
        <ConclusionAlert {...{ questionNeedsContactExit }} />
      )}
    </>
  );
};

export default QuestionAnswer;
