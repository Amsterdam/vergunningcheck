import { Question as ImtrQuestion } from "@vergunningcheck/imtr-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ComponentWrapper } from "../atoms";
import { actions, eventNames } from "../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../hoc/withTracking";
import { QUESTION_PAGE } from "../utils/test-ids";
import Answers, { AnswerProps } from "./Answers";
import Form from "./Form";
import Markdown from "./Markdown";
import Modal from "./Modal";
import Nav from "./Nav";
import QuestionAlert from "./QuestionAlert";

export const booleanOptions = [
  {
    label: "Ja",
    formValue: "yes",
    value: true,
  },
  {
    label: "Nee",
    formValue: "no",
    value: false,
  },
];

type QuestionProps = {
  matomoTrackEvent: any;
  question: ImtrQuestion;
  onGoToNext: () => void;
  onGoToPrev: () => void;
  questionIndex: number;
  questionNeedsContactExit: boolean;
  saveAnswer: (value: string | string[]) => void;
  shouldGoToConlusion: () => boolean;
  showQuestionAlert: boolean;
  showNext: boolean;
  userAnswer: string;
};

const Question: React.FC<QuestionProps & MatomoTrackEventProps> = ({
  matomoTrackEvent,
  question,
  questionIndex,
  questionNeedsContactExit,
  onGoToNext,
  onGoToPrev,
  saveAnswer,
  shouldGoToConlusion,
  showQuestionAlert,
  showNext,
  userAnswer,
}) => {
  const {
    answer: currentAnswer,
    collection,
    description,
    id: questionId,
    longDescription,
    options: questionAnswers,
    text: questionTitle,
    type: questionType,
  } = question;
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const { t } = useTranslation();
  const listAnswers = questionAnswers?.map(
    (answer) =>
      ({
        formValue: answer,
        label: answer,
        value: answer,
      } as AnswerProps)
  );
  const answers = questionType === "string" ? listAnswers : booleanOptions;
  const requiredFieldRadio = t("common.required field radio");

  useEffect(() => {
    if (questionId) {
      register(
        { name: questionId },
        {
          required: requiredFieldRadio,
        }
      );

      if (userAnswer) {
        setValue(questionId, userAnswer);
      }
    }
    return () => unregister(questionId);
  }, [
    questionId,
    register,
    unregister,
    currentAnswer,
    questionAnswers,
    setValue,
    userAnswer,
    t,
    requiredFieldRadio,
  ]);

  const handleChange = (e: React.FormEvent, collection: boolean) => {
    const { name, type, value } = e.target as HTMLInputElement;

    // Save the changed answer to the question.
    if (collection) {
      saveAnswer([value]);
    } else {
      saveAnswer(value);
    }

    // Set the value of the radio group to the selected value with react-hook-form's setValue
    if (type === "radio") setValue(name, value);
  };

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: `${eventNames.DESCRIPTION} - ${questionTitle}`,
    });
  };

  return (
    <Form
      dataId={questionId}
      dataTestId={QUESTION_PAGE}
      onSubmit={handleSubmit(onGoToNext)}
    >
      {description && (
        <Markdown eventLocation={eventNames.DESCRIPTION} source={description} />
      )}
      {longDescription && (
        <ComponentWrapper>
          <Modal
            handleOpenModal={handleOpenModal}
            heading="Toelichting"
            openButtonText="Toelichting"
          >
            <Markdown
              eventLocation={eventNames.LONG_DESCRIPTION}
              source={longDescription}
            />
          </Modal>
        </ComponentWrapper>
      )}
      <Answers
        answers={answers}
        collection={collection} //
        errors={errors}
        onChange={handleChange}
        questionId={questionId}
        questionIndex={questionIndex}
        userAnswer={userAnswer}
      />
      {showQuestionAlert && <QuestionAlert {...{ questionNeedsContactExit }} />}
      <Nav
        formEnds={shouldGoToConlusion()}
        nextText={shouldGoToConlusion() ? "Naar de uitkomst" : "Volgende vraag"}
        showPrev={questionIndex > 0} // Do not show back-button at the first question
        {...{
          onGoToPrev,
          showNext,
        }}
      />
    </Form>
  );
};

export default withTracking(Question);
