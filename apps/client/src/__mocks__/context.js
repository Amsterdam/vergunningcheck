import { useContext } from "react";
import Context from "../context";
import { topics } from "../config";

export default ({
  children,
  topicMock = "dakraam-plaatsen",
  addressMock,
  checker,
  questionId
}) => {
  const context = useContext(Context);
  const setData = jest.fn()

  context.topic = topics.find((t) => t.slug === topicMock);
  if (addressMock) {
    context.address = addressMock;
  }
  if (checker) {
    context.checker = checker;
  }
  if (questionId) {
    context.questionId = questionId;
  }
  context.setData = setData;
  return children;
};
