import * as imtr from "@vergunningcheck/imtr-client";
import React, { FunctionComponent } from "react";
import { useContext } from "react";

import { CheckerContext } from "../CheckerContext";
import { SessionContext } from "../SessionContext";
import { Address, TopicConfig } from "../types";

type SessionContextProviderProps = {
  addressMock?: Address;
  answers?: imtr.Answers;
  checker?: imtr.Checker;
  questionIndex?: number;
  topicMock: TopicConfig;
};

const SessionContextProvider: FunctionComponent<SessionContextProviderProps> = ({
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
