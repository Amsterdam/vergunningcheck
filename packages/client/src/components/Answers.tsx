import { ErrorMessage, Radio, RadioGroup } from "@amsterdam/asc-ui";
import React from "react";

import { ComponentWrapper, Label } from "../atoms";
import { removeQuotes } from "../utils";
import { QUESTION_ANSWERS } from "../utils/test-ids";

type AnswerProps = {
  formValue: string;
  label: string;
};

export type AnswersProps = {
  answers: AnswerProps[];
  className: string;
  errors: any;
  questionId: string;
  onChange: Function;
  userAnswer: string;
};

const Answers: React.FC<AnswersProps> = ({
  className,
  answers,
  userAnswer,
  errors,
  questionId,
  onChange,
}) => (
  <ComponentWrapper data-testid={QUESTION_ANSWERS}>
    <RadioGroup className={className} name={questionId}>
      {answers &&
        answers.map((answer) => {
          const { label, formValue } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label
              htmlFor={answerId}
              key={answerId}
              label={removeQuotes(label)}
            >
              <Radio
                key={answerId}
                value={formValue}
                id={answerId}
                onChange={(e) => onChange(e)}
                checked={userAnswer === label}
                error={errors[questionId]}
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
