import { useContext } from "react";

import { CheckerContext, SessionContext } from "../context";

export default ({
  children,
  topicMock,
  addressMock,
  checker,
  questionIndex,
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

  if (slug && addressMock) {
    Object.assign(sessionContext, { [slug]: { address: addressMock } });
  }

  if (slug && questionIndex) {
    Object.assign(sessionContext, { [slug]: { questionIndex } });
  }

  sessionContext.setSessionData = setSessionData;

  return children;
};
