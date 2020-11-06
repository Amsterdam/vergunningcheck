import { ErrorMessage, Radio, RadioGroup } from "@amsterdam/asc-ui";
import { removeQuotes } from "@vergunningcheck/imtr-client";
import React from "react";

import { ComponentWrapper, Label } from "../atoms";
import { QUESTION_ANSWERS } from "../utils/test-ids";

export type AnswerProps = {
  formValue: string;
  label: string;
  value: boolean | string;
};

export type AnswersProps = {
  answers?: AnswerProps[];
  errors: any;
  onChange: (e: React.MouseEvent<HTMLInputElement>) => void;
  questionId: string;
  questionIndex: number;
  userAnswer?: string;
};

const Answers: React.FC<AnswersProps> = ({
  answers,
  errors,
  onChange,
  questionId,
  questionIndex,
  userAnswer,
}) => (
  <ComponentWrapper data-testid={QUESTION_ANSWERS}>
    <RadioGroup name={questionId}>
      {answers &&
        answers.map((answer, index) => {
          const { label, formValue } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label
              data-testid={`q${questionIndex + 1}-a${index + 1}`}
              htmlFor={answerId}
              key={answerId}
              label={removeQuotes(label)}
            >
              <Radio
                checked={userAnswer === label}
                error={errors[questionId]}
                key={answerId}
                id={answerId}
                onChange={onChange}
                value={formValue}
              />
            </Label>
          );
        })}
    </RadioGroup>
    {errors[questionId] && (
      <ErrorMessage message={errors[questionId].message} />
    )}
  </ComponentWrapper>
);

export default Answers;
