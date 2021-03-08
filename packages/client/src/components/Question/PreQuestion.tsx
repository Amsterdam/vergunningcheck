import { Paragraph } from "@amsterdam/asc-ui";
import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useTopicData } from "../../hooks";
import { Answer, AnswerValue } from "../../types";
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
  setSkipAnsweredQuestions: (val: boolean) => {};
};

const PreQuestion: FunctionComponent<PreQuestionProps> = ({
  answer,
  description,
  questionAlertText,
  questionId,
  setSkipAnsweredQuestions,
}) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const { setTopicData, topicData } = useTopicData();
  const { t } = useTranslation();

  const { questionIndex } = topicData;
  const requiredText = t("common.required field text");

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

  const onGoToNext = () => {
    setTopicData({
      questionIndex: questionIndex + 1,
    });
    setSkipAnsweredQuestions(true);
  };

  const saveAnswer = (answer: Answer) => {
    setTopicData({
      questionMultipleCheckers: answer.value,
    });
  };

  return (
    <Form
      dataId={questionId}
      dataTestId={QUESTION_FORM}
      onSubmit={handleSubmit(() => onGoToNext && onGoToNext())}
    >
      {description && <Paragraph>{description}</Paragraph>}
      <Answers {...{ answer, errors, questionId, saveAnswer }} />

      <QuestionAlert marginBottom={8} {...{ questionAlertText }} />

      <Nav nextText={t("question.nextQuestion")} showNext />
    </Form>
  );
};

export default PreQuestion;
