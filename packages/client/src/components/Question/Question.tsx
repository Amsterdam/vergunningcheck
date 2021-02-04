import {
  ClientOutcomes,
  Question as ImtrQuestion,
} from "@vergunningcheck/imtr-client";
import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ComponentWrapper } from "../../atoms";
import { actions, eventNames } from "../../config/matomo";
import { useTopicData, useTracking } from "../../hooks";
import { Answer } from "../../types";
import { getAnswerLabel } from "../../utils";
import { QUESTION_FORM } from "../../utils/test-ids";
import Answers from "../Answers";
import Form from "../Form";
import Markdown from "../Markdown";
import Modal from "../Modal";
import Nav from "../Nav";
import { QuestionAlert } from "./";

type QuestionProps = {
  isCheckerConclusive: () => boolean;
  question: ImtrQuestion;
  onGoToNext: () => void;
  onGoToPrev: () => void;
  outcomeType: ClientOutcomes;
  saveAnswer: (answer: Answer) => void;
  showQuestionAlert: boolean;
  showNext: boolean;
};

const Question: FunctionComponent<QuestionProps> = ({
  isCheckerConclusive,
  question,
  outcomeType,
  onGoToNext,
  onGoToPrev,
  saveAnswer,
  showQuestionAlert,
  showNext,
}) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const {
    topicData: { questionIndex },
  } = useTopicData();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const requiredFieldRadio = t("common.required field radio");

  const {
    answer,
    description,
    id: questionId,
    longDescription,
    text: questionTitle,
  } = question;

  useEffect(() => {
    if (questionId) {
      register(
        { name: questionId },
        {
          required: requiredFieldRadio,
        }
      );

      if (answer !== undefined) {
        setValue(questionId, getAnswerLabel(answer));
      }
    }
    return () => unregister(questionId);
  }, [answer, questionId, register, unregister, setValue, requiredFieldRadio]);

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: `${eventNames.DESCRIPTION} - ${questionTitle}`,
    });
  };

  return (
    <Form
      dataId={questionId}
      dataTestId={QUESTION_FORM}
      onSubmit={handleSubmit(() => onGoToNext())}
    >
      {description && (
        <Markdown eventLocation={eventNames.DESCRIPTION} source={description} />
      )}

      {longDescription && (
        <ComponentWrapper>
          <Modal
            handleOpenModal={handleOpenModal}
            heading={t("question.meta.description")}
            openButtonText={t("question.meta.description")}
          >
            <Markdown
              eventLocation={eventNames.LONG_DESCRIPTION}
              source={longDescription}
            />
          </Modal>
        </ComponentWrapper>
      )}

      <Answers {...{ errors, question, saveAnswer }} />

      {showQuestionAlert && <QuestionAlert {...{ outcomeType }} />}

      <Nav
        formEnds={isCheckerConclusive()}
        nextText={
          isCheckerConclusive()
            ? t("outcome.goToOutcome")
            : t("question.nextQuestion")
        }
        showPrev={questionIndex > 0} // Do not show back-button at the first question
        {...{
          onGoToPrev,
          showNext,
        }}
      />
    </Form>
  );
};

export default Question;
