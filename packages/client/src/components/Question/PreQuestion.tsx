import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AnswerValue, PreQuestionFunctions } from "../../types";
import { getAnswerLabel } from "../../utils";
import { QUESTION_FORM } from "../../utils/test-ids";
import Answers from "../Answers";
import Form from "../Form";
import Nav from "../Nav";
import QuestionAlert from "./QuestionAlert";

type PreQuestionProps = {
  answer?: AnswerValue;
  description?: string;
  questionAlertText?: string;
  questionId: string;
};

const PreQuestion: FunctionComponent<
  PreQuestionProps & PreQuestionFunctions
> = ({
  answer,
  description,
  goToNextQuestion,
  questionAlertText,
  questionId,
  saveAnswer,
}) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const { t } = useTranslation();

  const requiredText = t("common.required field radio");

  useEffect(() => {
    register(
      { name: questionId },
      {
        required: requiredText,
      }
    );

    if (answer !== undefined) {
      setValue(questionId, getAnswerLabel(answer));
    }
    return () => unregister(questionId);
  }, [answer, questionId, register, unregister, setValue, requiredText]);

  return (
    <Form
      dataId={questionId}
      dataTestId={QUESTION_FORM}
      onSubmit={handleSubmit(() => goToNextQuestion())}
    >
      {description && <Paragraph>{description}</Paragraph>}
      <Answers {...{ answer, errors, questionId, saveAnswer }} />

      <QuestionAlert marginBottom={8} {...{ questionAlertText }} />

      <Nav nextText={t("question.nextQuestion")} showNext />
    </Form>
  );
};

export default PreQuestion;
