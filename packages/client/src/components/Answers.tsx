import { ErrorMessage, Radio, RadioGroup } from "@amsterdam/asc-ui";
import { removeQuotes } from "@vergunningcheck/imtr-client";
import { Question as ImtrQuestion } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { FieldErrors } from "react-hook-form";

import { ComponentWrapper, Label } from "../atoms";
import { useTopicData } from "../hooks";
import { Answer } from "../types";
import { booleanOptions } from "../utils";
import { QUESTION_ANSWERS } from "../utils/test-ids";

type AnswersProps = {
  errors: FieldErrors; // This prop needs to be passed down, because the useForm() hook fails fetching `errors` in this component
  question: ImtrQuestion;
  saveAnswer: (answer: Answer) => void;
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
        label: removeQuotes(option),
        value: option,
      }))
    : booleanOptions;

  const showCheckboxInput = question.collection;
  const showRadioInput = !showCheckboxInput;

  return (
    <ComponentWrapper data-testid={QUESTION_ANSWERS}>
      {showCheckboxInput &&
        answers?.map((answer, index) => {
          const { label, formValue, value } = answer;
          const answerId = `${id}-${formValue}`;
          const checked = !!(
            Array.isArray(userAnswer) &&
            userAnswer?.find((answer) => answer && answer === value)
          );
          return (
            <Label
              data-testid={`q${questionIndex + 1}-a${index + 1}`}
              htmlFor={answerId}
              key={answerId}
              label={label}
            >
              <input
                type="checkbox"
                checked={checked}
                // error={errors[questionId]}
                key={answerId}
                id={answerId}
                onChange={() => {
                  saveAnswer(answer);
                }}
                value={formValue}
              />
            </Label>
          );
        })}

      {showRadioInput && (
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
                  onChange={() => saveAnswer(answer)}
                  value={formValue}
                />
              </Label>
            );
          })}
        </RadioGroup>
      )}
      {errors[id] && <ErrorMessage message={errors[id].message} />}
    </ComponentWrapper>
  );
};

export default Answers;
