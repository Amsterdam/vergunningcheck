import { ErrorMessage, Radio, RadioGroup } from "@amsterdam/asc-ui";
import * as imtr from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { FieldErrors } from "react-hook-form";

import { ComponentWrapper, Label } from "../atoms";
import { Answer, AnswerValue } from "../types";
import { booleanOptions } from "../utils";
import { QUESTION_ANSWERS } from "../utils/test-ids";

type AnswersProps = {
  answer?: AnswerValue;
  errors: FieldErrors; // This prop needs to be passed down, because the useForm() hook fails fetching `errors` in this component
  question?: imtr.Question;
  questionId: string;
  saveAnswer: (answer: Answer, question?: imtr.Question) => void;
};

const Answers: FunctionComponent<AnswersProps> = ({
  answer,
  errors,
  question,
  questionId,
  saveAnswer,
}) => {
  const answers: Answer[] = question?.options
    ? question.options.map((option) => ({
        formValue: option,
        label: imtr.removeQuotes(option),
        value: option,
      }))
    : booleanOptions;

  const userAnswer = answer ?? question?.answer;

  return (
    <ComponentWrapper data-testid={QUESTION_ANSWERS} marginBottom={0}>
      <RadioGroup name={questionId}>
        {answers?.map((answer, index) => {
          const { label, formValue, value } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label
              data-testid={`${questionId}-a${index + 1}`}
              htmlFor={answerId}
              key={answerId}
              label={label}
            >
              <Radio
                checked={userAnswer === value}
                error={errors[questionId]}
                key={answerId}
                id={answerId}
                onChange={() => saveAnswer(answer, question)}
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
};

export default Answers;
