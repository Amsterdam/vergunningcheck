import { Answers, Checker } from "@vergunningcheck/imtr-client";
import React from "react";
import { useContext } from "react";

import { CheckerContext } from "../CheckerContext";
import { Topic } from "../config";
import { SessionContext } from "../SessionContext";

type Props = {
  addressMock?: any;
  answers?: Answers;
  checker?: Checker;
  questionIndex?: number;
  topicMock: Topic;
};

const SessionContextProvider: React.FC<Props> = ({
  addressMock,
  answers: answersMock,
  checker,
  children,
  questionIndex: questionIndexMock,
  topicMock,
}) => {
  const checkerContext = useContext(CheckerContext);
  const sessionContext = useContext(SessionContext);
  const setSession = jest.fn();

  const { slug } = topicMock;

  if (checker) {
    checkerContext.checker = checker;
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

  sessionContext.setSession = setSession;

  return <>{children}</>;
};

export default SessionContextProvider;
