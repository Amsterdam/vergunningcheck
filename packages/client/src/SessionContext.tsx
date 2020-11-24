import { Answer } from "@vergunningcheck/imtr-client";
import React, { useEffect, useReducer } from "react";
import { createContext } from "react";

import { getSlugFromPathname } from "./utils";

export type TopicData = {
  activeComponents?: string[];
  address: null | any;
  answers: {
    [id: string]: Answer;
  };
  finishedComponents: string[];
  type: string;
  questionIndex: number;
};

export const defaultTopicSession: TopicData = {
  activeComponents: [],
  address: null,
  answers: {},
  finishedComponents: [],
  questionIndex: 0,
  type: "",
};

export type setTopicFn = (topicData: null | Partial<TopicData>) => void;
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
  setTopicData: setTopicFn;
  topicData: TopicData;
};

const session = JSON.parse(sessionStorage.getItem("sessionData") as string);

const startSession = session ? session : {};

const startContext: AppSessionContext = {
  session: startSession,
  setSession: () => {},
  setTopicData: () => {},
  topicData: defaultTopicSession,
};

export const SessionContext = createContext(startContext);

const sessionReducer = (session: SessionData, data: Partial<SessionData>) => {
  return {
    ...session,
    ...data,
  } as SessionData;
};

export const topicReducer = (
  topicData: TopicData,
  data: null | Partial<TopicData>
) => {
  if (data === null) {
    console.warn("Reset topicData to defaultTopicSession");
    return defaultTopicSession;
  }
  return {
    ...topicData,
    ...data,
  };
};

export const SessionProvider: React.FC = ({ children }) => {
  // We use the reducer to take care of too complex logic for setState.
  // Because we sometimes need to clear the sessionStorage.
  const [session, setSession] = useReducer(sessionReducer, startSession);
  const slug = getSlugFromPathname(window.location.pathname);
  defaultTopicSession.type = slug;

  const initialState = session[slug] || defaultTopicSession;
  const [topicData, setTopicData] = useReducer(topicReducer, initialState);

  useEffect(() => {
    sessionStorage.setItem("sessionData", JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    setSession({ [slug]: topicData });
  }, [slug, topicData]);

  // The session provider makes the data from the context available on all pages.
  // We can use the setSessionData function to add new data to the sessionStorage.
  return (
    <SessionContext.Provider
      value={{ session, setSession, topicData, setTopicData }}
    >
      {children}
    </SessionContext.Provider>
  );
};
