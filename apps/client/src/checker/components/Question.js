import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Heading } from "@datapunt/asc-ui";

import { requiredFieldText } from "../../config";
import { QUESTION_PAGE } from "../../utils/test-ids";
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import Nav from "../../components/Nav";
import Answers from "../../components/Answers";
import Markdown from "../../components/Markdown";

export const booleanOptions = [
  {
    label: "Nee",
    formValue: "no",
    value: false,
  },
  {
    label: "Ja",
    formValue: "yes",
    value: true,
  },
];

const hasKeys = (obj) =>
  // convert to array, map, and then give the length
  Object.entries(obj).map(([key, value]) => [key, value]).length;

const Question = ({
                    question: {
                      id: questionId,
                      type: questionType,
                      text: questionTitle,
                      options: questionAnswers,
                      answer: currentAnswer,
                      description,
                      longDescription,
                    },
                    className,
                    headingAs,
                    onSubmit: onSubmitProp,
                    hideNavigation,
                    showNext,
                    showPrev,
                    onGoToPrev,
                  }) => {
  const { handleSubmit, register, unregister, setValue, errors } = useForm();
  const listAnswers = questionAnswers?.map((answer) => ({
    label: answer,
    formValue: answer,
    value: answer,
  }));
  const answers = questionType === "string" ? listAnswers : booleanOptions;
  let answer;

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
  ]); // IE11 fix to put all dependencies here

  const handleChange = (e) => {
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

  if (questionAnswers) {
    answer = currentAnswer;
  } else {
    const responseObj = booleanOptions.find((o) => o.value === currentAnswer);
    answer = responseObj?.formValue;
  }

  return (
    <Form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
      data-id={questionId}
      data-testid={QUESTION_PAGE}
    >
      {questionTitle && (
        <Heading forwardedAs={headingAs}>{questionTitle}</Heading>
      )}
      { description && <Markdown source={description} />}
      { longDescription && <Modal modalText={longDescription} />}
      <Answers
        questionId={questionId}
        onChange={handleChange}
        errors={errors}
        answers={answers}
        currentAnswer={answer}
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
  onSubmit: PropTypes.func,
  hideNavigation: PropTypes.bool,
  required: PropTypes.bool,
  showNext: PropTypes.bool,
  showPrev: PropTypes.bool,
  onGoToPrev: PropTypes.func,
};

export default Question;