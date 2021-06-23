import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Form } from "../../atoms";
import { Answer, AnswerValue, PreQuestionFunctions } from "../../types";
import { getAnswerLabel } from "../../utils";
import { QUESTION_FORM } from "../../utils/test-ids";
import Answers from "../Answers";
import Nav from "../Nav";
import QuestionAlert from "./QuestionAlert";

type PreQuestionProps = {
  answer?: AnswerValue;
  description?: string;
  questionAlertText?: string;
  questionId: string;
  topicDataKey: string;
};

const PreQuestion: FunctionComponent<
  PreQuestionProps & PreQuestionFunctions
> = ({
  answer,
  description,
  goToNextQuestion,
  isCheckerConclusive,
  questionAlertText,
  questionId,
  saveAnswer: saveAnswerProp,
  topicDataKey,
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

  // Pass the custom key to update the value in the session storage
  const saveAnswer = (answer: Answer) => saveAnswerProp(answer, topicDataKey);

  return (
    <Form
      dataId={questionId}
      dataTestId={QUESTION_FORM}
      onSubmit={handleSubmit(goToNextQuestion)}
    >
      {/* Show the optional description below the title */}
      {description && <Paragraph>{description}</Paragraph>}

      {/* Show the answer options */}
      <Answers {...{ answer, errors, questionId, saveAnswer }} />

      {/* Show the optional QuestionAlert in case the `questionAlertText` has been set  */}
      <QuestionAlert marginBottom={8} {...{ questionAlertText }} />

      {/* Show the navigation with the Next/Prev buttons */}
      <Nav
        nextText={
          isCheckerConclusive()
            ? t("outcome.goToOutcome")
            : t("question.nextQuestion")
        }
        showNext
      />
    </Form>
  );
};

export default PreQuestion;
