import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { requiredFieldText } from "../config";
import { QUESTION_PAGE } from "../utils/test-ids";
import Answers from "./Answers";
import Form from "./Form";
import Markdown from "./Markdown";
import Modal from "./Modal";
import Nav from "./Nav";
import QuestionNeedsPermit from "./QuestionNeedsPermit";

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
    id: questionId,
    type: questionType,
    options: questionAnswers,
    answer: currentAnswer,
    description,
    longDescription,
  },
  userAnswer,
  className,
  checker,
  editQuestion,
  setEditQuestion,
  onGoToNext,
  saveAnswer,
  hideNavigation,
  showNext,
  showPrev,
  onGoToPrev,
  questionIndex,
  questionNeedsPermit,
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
          required: requiredFieldText,
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

  return (
    <Form
      className={className}
      onSubmit={handleSubmit(onGoToNext)}
      data-id={questionId}
      data-testid={QUESTION_PAGE}
    >
      {description && <Markdown source={description} />}
      {longDescription && <Modal modalText={longDescription} />}
      <Answers
        questionId={questionId}
        onChange={handleChange}
        errors={errors}
        answers={answers}
        userAnswer={userAnswer}
      />
      {questionNeedsPermit && <QuestionNeedsPermit />}
      {!hideNavigation && (
        <Nav showPrev={showPrev} showNext={showNext} onGoToPrev={onGoToPrev} />
      )}
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
  hideNavigation: PropTypes.bool,
  questionNeedsPermit: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  onSubmit: PropTypes.func,
  required: PropTypes.bool,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  userAnswer: PropTypes.string,
};

export default Question;
