import { useContext } from "react";
import Context from "../context";
import { topics } from "../config";

export default ({
  children,
  topicMock = "dakraam-plaatsen",
  addressMock,
  checker,
}) => {
  const context = useContext(Context);
  context.topic = topics.find((t) => t.slug === topicMock);
  if (addressMock) {
    context.autofillData.address = addressMock;
  }
  if (checker) {
    context.checker = checker;
  }
  return children;
};
