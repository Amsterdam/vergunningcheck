import { ErrorMessage, Radio, RadioGroup } from "@amsterdam/asc-ui";
import * as imtr from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { FieldErrors } from "react-hook-form";

import { ComponentWrapper, Label } from "../atoms";
import { useTopicData } from "../hooks";
import { Answer } from "../types";
import { booleanOptions } from "../utils";
import { QUESTION_ANSWERS } from "../utils/test-ids";

type AnswersProps = {
  errors: FieldErrors; // This prop needs to be passed down, because the useForm() hook fails fetching `errors` in this component
  question: imtr.Question;
  saveAnswer: (answer: Answer, question?: imtr.Question) => void;
};

const Answers: FunctionComponent<AnswersProps> = ({
  errors,
  question,
  saveAnswer,
}) => {
  const {
    topicData: { questionIndex },
  } = useTopicData();

  const { answer: userAnswer, id, options } = question;

  const answers: Answer[] = options
    ? options.map((option) => ({
        formValue: option,
        label: imtr.removeQuotes(option),
        value: option,
      }))
    : booleanOptions;

  return (
    <ComponentWrapper data-testid={QUESTION_ANSWERS}>
      <RadioGroup name={id}>
        {answers?.map((answer, index) => {
          const { label, formValue, value } = answer;
          const answerId = `${id}-${formValue}`;
          return (
            <Label
              data-testid={`q${questionIndex + 1}-a${index + 1}`}
              htmlFor={answerId}
              key={answerId}
              label={label}
            >
              <Radio
                checked={userAnswer === value}
                error={errors[id]}
                key={answerId}
                id={answerId}
                onChange={() => saveAnswer(answer, question)}
                value={formValue}
              />
            </Label>
          );
        })}
      </RadioGroup>
      {errors[id] && <ErrorMessage message={errors[id].message} />}
    </ComponentWrapper>
  );
};

export default Answers;
