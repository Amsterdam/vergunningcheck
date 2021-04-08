import * as imtr from "@vergunningcheck/imtr-client";
import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ComponentWrapper, Form } from "../../atoms";
import { actions, eventNames } from "../../config/matomo";
import { useTopic, useTopicData, useTracking } from "../../hooks";
import { Answer } from "../../types";
import { getAnswerLabel } from "../../utils";
import { QUESTION_FORM } from "../../utils/test-ids";
import Answers from "../Answers";
import Markdown from "../Markdown";
import Modal from "../Modal";
import Nav from "../Nav";
import { QuestionAlert } from "./";

type QuestionProps = {
  hideNav?: boolean;
  isCheckerConclusive: () => boolean;
  question: imtr.Question;
  onGoToNext?: () => void;
  onGoToPrev?: () => void;
  outcomeType: imtr.ClientOutcomes;
  saveAnswer: (answer: Answer, question?: imtr.Question) => void;
  showQuestionAlert: boolean;
  showNext?: boolean;
};

const Question: FunctionComponent<QuestionProps> = ({
  hideNav,
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
  const { isPermitForm } = useTopic();
  const { matomoTrackEvent } = useTracking();
  const { t } = useTranslation();

  const {
    answer,
    description,
    id: questionId,
    longDescription,
    options,
    text: questionTitle,
    type,
  } = question;

  // Determine the question type (can be extended with Checkbox)
  const isRadio = type === "boolean" || (type === "string" && options);

  const requiredText = isRadio
    ? t("common.required field radio")
    : t("common.required field text");

  useEffect(() => {
    if (questionId) {
      register(
        { name: questionId },
        {
          required: requiredText,
        }
      );

      if (answer !== undefined) {
        setValue(questionId, getAnswerLabel(answer));
      }
    }
    return () => unregister(questionId);
  }, [answer, questionId, register, unregister, setValue, requiredText]);

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
      onSubmit={handleSubmit(() => onGoToNext && onGoToNext())}
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

      <Answers {...{ errors, question, questionId, saveAnswer }} />

      {showQuestionAlert && <QuestionAlert {...{ outcomeType }} />}

      {!hideNav && (
        <Nav
          formEnds={isCheckerConclusive() || isPermitForm}
          nextText={
            isPermitForm
              ? t("common.go to the next step")
              : isCheckerConclusive()
              ? t("outcome.goToOutcome")
              : t("question.nextQuestion")
          }
          showPrev={questionIndex > 0} // Do not show back-button at the first question
          {...{
            onGoToPrev,
            showNext,
          }}
        />
      )}
    </Form>
  );
};

export default Question;
