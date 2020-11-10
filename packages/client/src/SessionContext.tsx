import { Answer } from "@vergunningcheck/imtr-client";
import React, { useEffect, useReducer } from "react";
import { createContext } from "react";

export type TopicData = {
  activeComponents?: string[];
  answers: {
    [id: string]: Answer;
  };
  address: null | any;
  finishedComponents: string[];
  questionIndex: number;
};

export const defaultTopicSession: TopicData = {
  activeComponents: ["locatie invoer"],
  answers: {},
  address: null,
  finishedComponents: [],
  questionIndex: 0,
};

export type setSessionFn = (sessionData: Partial<SessionData>) => void;
export type SessionData = {
  [slug: string]: TopicData;
};

export type setTopicSessionDataFn = (
  topicData: null | Partial<TopicData>
) => void;

type AppSessionContext = {
  session: SessionData;
  setSession: setSessionFn;
};

const defaultSession = {};

const defaultContext: AppSessionContext = {
  session: defaultSession,
  setSession: () => {},
};

export const SessionContext = createContext(defaultContext);

const sessionReducer = (session: SessionData, data: Partial<SessionData>) => {
  return {
    ...session,
    ...data,
  } as SessionData;
};

export const SessionProvider: React.FC = ({ children }) => {
  // We use the reducer to take care of too complex logic for setState.
  // Because we sometimes need to clear the sessionStorage.
  const [session, setSession] = useReducer(sessionReducer, defaultSession);

  useEffect(() => {
    sessionStorage.setItem("sessionData", JSON.stringify(session));
  }, [session]);

  // The session provider makes the data from the context available on all pages.
  // We can use the setSessionData function to add new data to the sessionStorage.
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
