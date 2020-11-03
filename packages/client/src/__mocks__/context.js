import { useContext } from "react";

import { CheckerContext, SessionContext } from "../context";

export default ({
  addressMock,
  answers: answersMock,
  checker,
  children,
  questionIndex: questionIndexMock,
  topicMock,
}) => {
  const checkerContext = useContext(CheckerContext);
  const sessionContext = useContext(SessionContext);
  const setSessionData = jest.fn();

  const { slug } = topicMock;

  if (checker) {
    checkerContext.checker = checker;
  }

  if (topicMock) {
    checkerContext.topic = topicMock;
  }

  if (slug) {
    const address = addressMock ? addressMock : null;
    const answers = answersMock ? answersMock : null;
    const questionIndex =
      typeof questionIndexMock === "number" ? questionIndexMock : null;
    Object.assign(sessionContext, {
      [slug]: { address, answers, questionIndex },
    });
  }

  sessionContext.setSessionData = setSessionData;

  return children;
};
