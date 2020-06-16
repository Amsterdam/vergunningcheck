import { useContext } from "react";
import { SessionContext, CheckerContext } from "../context";
import { topics } from "../config";

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

  checkerContext.topic = topics.find((t) => t.slug === topicMock);
  if (addressMock) {
    sessionContext.address[topicMock.slug] = addressMock;
  }
  if (questionIndex) {
    sessionContext.questionIndex = questionIndex;
  }
  sessionContext.setSessionData = setSessionData;
  return children;
};
