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

type AnswersProps = {
  answers?: AnswerProps[];
  collection: boolean;
  errors: any;
  onChange: (e: React.FormEvent<HTMLInputElement>, collection: boolean) => void;
  questionId: string;
  questionIndex: number;
  userAnswer: string;
};

const Answers: React.FC<AnswersProps> = ({
  answers,
  collection,
  errors,
  onChange,
  questionId,
  questionIndex,
  userAnswer,
}) => {
  return (
    <ComponentWrapper data-testid={QUESTION_ANSWERS}>
      {collection ? (
        answers?.map((answer, index) => {
          const { label, formValue } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label
              data-testid={`q${questionIndex + 1}-a${index + 1}`}
              htmlFor={answerId}
              key={answerId}
              label={removeQuotes(label)}
            >
              <input
                type="checkbox"
                checked={userAnswer === label}
                // error={errors[questionId]}
                key={answerId}
                id={answerId}
                onChange={(e) => onChange(e, true)}
                value={formValue}
              />
            </Label>
          );
        })
      ) : (
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
                    onChange={(e) => onChange(e, false)}
                    value={formValue}
                  />
                </Label>
              );
            })}
        </RadioGroup>
      )}
      {errors[questionId] && (
        <ErrorMessage message={errors[questionId].message} />
      )}
    </ComponentWrapper>
  );
};

export default Answers;
