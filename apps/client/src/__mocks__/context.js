import { useContext } from "react";
import Context from "../context";
import { topics } from "../config";

export default ({
  children,
  topicMock = "dakraam-plaatsen",
  addressMock,
  checker,
  questionIndex,
}) => {
  const context = useContext(Context);
  const setData = jest.fn();

  context.topic = topics.find((t) => t.slug === topicMock);
  if (addressMock) {
    context.address[topicMock.slug] = addressMock;
  }
  if (checker) {
    context.checker = checker;
  }
  if (questionIndex) {
    context.questionIndex = questionIndex;
  }
  context.setData = setData;
  return children;
};
