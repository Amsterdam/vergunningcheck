import { useContext } from "react";

import { topics } from "../config";
import Context from "../context";

export default ({
  children,
  topicMock = "dakraam-plaatsen",
  addressMock,
  checker,
}) => {
  const context = useContext(Context);
  context.topic = topics.find((t) => t.slug === topicMock);
  if (addressMock) {
    context.address = addressMock;
  }
  if (checker) {
    context.checker = checker;
  }
  return children;
};
