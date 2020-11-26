import { Answer } from "@vergunningcheck/imtr-client";
import React, { useEffect, useReducer } from "react";
import { createContext } from "react";

import { useSlug } from "./hooks";

// @TODO: All these types are going to be moved from this file when we merge this with `checker-slopen`
export type Restriction = {
  __typename?: string;
  name?: string;
  scope?: string;
};
export type ZoningPlan = {
  __typename?: string;
  name?: string;
  scope?: string;
};
export type AddressType = {
  __typename?: string;
  districtName: string;
  houseNumber: number;
  houseNumberFull: string;
  id: string;
  neighborhoodName: string;
  postalCode: string;
  residence: string;
  restrictions: Restriction[];
  streetName: string;
  zoningPlans: ZoningPlan[];
};
export type Address = null | AddressType;

export type TopicData = {
  activeComponents?: string[];
  address: Address;
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
  const slug = useSlug();

  const initialState = session[slug] || defaultTopicSession;
  const [topicData, setTopicData] = useReducer(topicReducer, initialState);

  useEffect(() => {
    // Update the `session` with default `topicData` when the `slug` changes
    if (slug && !session[slug]) {
      setSession({ [slug]: defaultTopicSession });
      setTopicData(defaultTopicSession);
    }
    // eslint-disable-next-line
  }, [slug]);

  useEffect(() => {
    // Update the `slug` key in `session` with the updated `topicData`
    setSession({ [slug]: topicData });
    // eslint-disable-next-line
  }, [topicData]);

  useEffect(() => {
    // Update the browser Session Storage with the whole `session`
    sessionStorage.setItem("sessionData", JSON.stringify(session));
  }, [session]);

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
