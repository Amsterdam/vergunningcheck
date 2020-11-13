import { Answer } from "@vergunningcheck/imtr-client";
import React, { useEffect, useReducer } from "react";
import { createContext } from "react";

// import { useSlug } from "./hooks";
import { getSlugFromPathname } from "./utils";

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
  topicData: TopicData;
  setTopicData: setTopicFn;
};

const session = JSON.parse(sessionStorage.getItem("sessionData") as string);

const startSession = session ? session : {};

const startContext: AppSessionContext = {
  session: startSession,
  setSession: () => {},
  topicData: defaultTopicSession,
  setTopicData: () => {},
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
