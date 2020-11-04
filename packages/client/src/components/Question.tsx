import { Question as ImtrQuestion } from "@vergunningcheck/imtr-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ComponentWrapper } from "../atoms";
import { requiredFieldRadio } from "../config";
import { actions, eventNames } from "../config/matomo";
import withTracking, { MatomoTrackEventProps } from "../hoc/withTracking";
import { QUESTION_PAGE } from "../utils/test-ids";
import Answers, { AnswerProps } from "./Answers";
import ConclusionAlert from "./ConclusionAlert";
import Form from "./Form";
import Markdown from "./Markdown";
import Modal from "./Modal";
import Nav from "./Nav";

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
  outcomeType: string;
  saveAnswer: (value: string) => void;
  shouldGoToConlusion: () => boolean;
  showConclusionAlert: boolean;
  showNext: boolean;
  userAnswer: string;
};

const Question: React.FC<QuestionProps & MatomoTrackEventProps> = ({
  matomoTrackEvent,
  question,
  questionIndex,
  outcomeType,
  onGoToNext,
  onGoToPrev,
  saveAnswer,
  shouldGoToConlusion,
  showConclusionAlert,
  showNext,
  userAnswer,
}) => {
  const {
    answer: currentAnswer,
    description,
    id: questionId,
    longDescription,
    options: questionAnswers,
    text: questionTitle,
    type: questionType,
  } = question;
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const listAnswers = questionAnswers?.map(
    (answer) =>
      ({
        formValue: answer,
        label: answer,
        value: answer,
      } as AnswerProps)
  );
  const answers = questionType === "string" ? listAnswers : booleanOptions;

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
  ]);

  const handleChange = (e: React.MouseEvent) => {
    const { name, type, value } = e.target as HTMLInputElement;

    // Save the changed answer to the question.
    saveAnswer(value);

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
        errors={errors}
        onChange={handleChange}
        questionId={questionId}
        questionIndex={questionIndex}
        userAnswer={userAnswer}
      />
      {showConclusionAlert && <ConclusionAlert {...{ outcomeType }} />}
      <Nav
        formEnds={shouldGoToConlusion()}
        nextText={shouldGoToConlusion() ? "Naar conclusie" : "Volgende vraag"}
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
