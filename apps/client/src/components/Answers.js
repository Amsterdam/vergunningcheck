import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Label, Radio, RadioGroup } from "@datapunt/asc-ui";
import { QUESTION_ANSWERS } from "../utils/test-ids";
import { StyledAnswerErrorText, StyledAnswer } from "./AnswersStyles";

const Answers = ({
  className,
  answers,
  currentAnswer,
  errors,
  questionId,
  onChange,
}) => (
  <StyledAnswer hasError={errors[questionId]} data-testid={QUESTION_ANSWERS}>
    {errors[questionId] && (
      <StyledAnswerErrorText>
        {errors[questionId].message}
      </StyledAnswerErrorText>
    )}
    <RadioGroup className={className} name={questionId}>
      {answers &&
        answers.map((answer) => {
          const { label, formValue } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label
              htmlFor={answerId}
              key={answerId}
              label={label.replace(/['"]+/g, "")}
            >
              <Radio
                key={answerId}
                value={formValue}
                id={answerId}
                onChange={(e) => onChange(e)}
                checked={currentAnswer === answer.formValue}
              />
            </Label>
          );
        })}
    </RadioGroup>
  </StyledAnswer>
);

const StyledAnswers = styled(Answers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

Answers.propTypes = {
  className: PropTypes.string,
  currentAnswer: PropTypes.string,
  errors: PropTypes.any,
  answers: PropTypes.array,
  questionId: PropTypes.string,
  onChange: PropTypes.func,
};

export default StyledAnswers;
