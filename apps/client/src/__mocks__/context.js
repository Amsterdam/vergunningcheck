import { useContext } from "react";
import { SessionContext, CheckerContext } from "../context";

export default ({
  children,
  topicMock = "dakraam-plaatsen",
  addressMock,
  checker,
  questionIndex,
}) => {
  const checkerContext = useContext(CheckerContext);
  const sessionContext = useContext(SessionContext);
  const setSessionData = jest.fn();

  if (checker) {
    checkerContext.checker = checker;
  }

  if (topicMock) {
    checkerContext.topic = topicMock;
  }

  if (addressMock) {
    checkerContext.autofillData.address = {
      [topicMock.slug]: addressMock,
    };
  }

  if (questionIndex) {
    sessionContext.questionIndex = questionIndex;
  }
  sessionContext.setSessionData = setSessionData;
  return children;
};
