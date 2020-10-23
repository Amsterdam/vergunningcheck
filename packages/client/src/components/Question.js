import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ComponentWrapper } from "../atoms";
import { requiredFieldRadio } from "../config";
import { actions, eventNames } from "../config/matomo";
import withTracking from "../hoc/withTracking";
import { QUESTION_PAGE } from "../utils/test-ids";
import Answers from "./Answers";
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

const Question = ({
  question: {
    answer: currentAnswer,
    description,
    id: questionId,
    longDescription,
    options: questionAnswers,
    text: questionTitle,
    type: questionType,
  },
  checker,
  className,
  editQuestion,
  matomoTrackEvent,
  onGoToNext,
  onGoToPrev,
  questionIndex,
  questionNeedsContactExit,
  saveAnswer,
  setEditQuestion,
  shouldGoToConlusion,
  showConclusionAlert,
  showNext,
  userAnswer,
}) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const listAnswers = questionAnswers?.map((answer) => ({
    label: answer,
    formValue: answer,
    value: answer,
  }));
  const answers = questionType === "string" ? listAnswers : booleanOptions;

  useEffect(() => {
    if (questionId) {
      register(
        { name: questionId },
        {
          required: requiredFieldRadio,
        }
      );

      // Set value if question has already been answered to prevent 'fake' requirement
      if (currentAnswer !== undefined) {
        if (questionAnswers) {
          setValue(questionId, currentAnswer);
        } else {
          const responseObj = booleanOptions.find(
            (o) => o.value === currentAnswer
          );
          setValue(questionId, responseObj.formValue);
        }
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
  ]);

  const handleChange = (e) => {
    // On edit question, keep the current stack until the answer is changed.
    if (editQuestion) {
      checker.rewindTo(questionIndex);
      setEditQuestion(false);
    }

    // Save the changed answer to the question.
    saveAnswer(e.target.value);

    // Set the value of the radio group to the selected value with react-hook-form's setValue
    if (e.target.type === "radio") setValue(e.target.name, e.target.value);
  };

  const handleOpenModal = () => {
    matomoTrackEvent({
      action: actions.OPEN_MODAL,
      name: `${eventNames.DESCRIPTION} - ${questionTitle}`,
    });
  };

  return (
    <Form
      className={className}
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
      {showConclusionAlert && (
        <ConclusionAlert {...{ questionNeedsContactExit }} />
      )}
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

Question.defaultProps = {
  question: {
    answer: "",
    description: "",
    longDescription: "",
  },
  headingAs: "h3",
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.array,
    description: PropTypes.string,
    longDescription: PropTypes.string,
    answer: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }),
  className: PropTypes.string,
  headingAs: PropTypes.string,
  questionNeedsContactExit: PropTypes.bool,
  showConclusionAlert: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  onSubmit: PropTypes.func,
  required: PropTypes.bool,
  shouldGoToConlusion: PropTypes.func,
  showNext: PropTypes.bool,
  userAnswer: PropTypes.string,
};

export default withTracking(Question);
