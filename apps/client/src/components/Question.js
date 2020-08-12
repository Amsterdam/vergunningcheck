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

const hasKeys = (obj) =>
  // convert to array, map, and then give the length
  Object.entries(obj).map(([key, value]) => [key, value]).length;

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
  onSubmit: onSubmitProp,
  hideNavigation,
  showNext,
  showPrev,
  onGoToPrev,
  questionIndex,
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
    if (e.target.type === "radio") setValue(e.target.name, e.target.value);
  };

  const onSubmit = (data) => {
    // Is only triggered with validated form
    // Check if data has a key that matches the questionId
    if (
      (onSubmitProp && !hasKeys(data)) ||
      (hasKeys(data) && data[questionId])
    ) {
      onSubmitProp(data[questionId]);
    }
  };

  return (
    <Form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
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
  onGoToPrev: PropTypes.func,
  onSubmit: PropTypes.func,
  required: PropTypes.bool,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  userAnswer: PropTypes.string,
};

export default Question;
