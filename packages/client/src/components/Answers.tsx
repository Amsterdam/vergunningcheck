import { ErrorMessage, Radio, RadioGroup, TextField } from "@amsterdam/asc-ui";
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

  const { answer: userAnswer, id, options, type } = question;

  const answers: Answer[] = options
    ? options.map((option) => ({
        formValue: option,
        label: imtr.removeQuotes(option),
        value: option,
      }))
    : booleanOptions;

  // @TODO: make generic functions, like: isRadioQuestion(), isCheckboxQuestion, etc
  const showRadioInput = type === "boolean" || (type === "string" && options);
  const showTextField = type === "string" && !showRadioInput;

  // @TODO: place all individual form components in separate components when Checkbox is also added
  return (
    <ComponentWrapper data-testid={QUESTION_ANSWERS} marginBottom={0}>
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
                  onChange={() => saveAnswer(answer, question)}
                  value={formValue}
                />
              </Label>
            );
          })}
        </RadioGroup>
      )}

      {showTextField && (
        <ComponentWrapper>
          <TextField
            onChange={({ target: { value } }) =>
              saveAnswer({ label: value, value }, question)
            }
            value={userAnswer as string}
          />
        </ComponentWrapper>
      )}
      {errors[id] && <ErrorMessage message={errors[id].message} />}
    </ComponentWrapper>
  );
};

export default Answers;
