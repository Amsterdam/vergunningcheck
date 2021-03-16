import React, { FunctionComponent, useEffect, useReducer } from "react";
import { createContext } from "react";

import { useSlug } from "./hooks";
import { SessionData, TopicData, setSessionFn, setTopicFn } from "./types";
import { findTopicBySlug } from "./utils";

type AppSessionContext = {
  session: SessionData;
  setSession: setSessionFn;
  setTopicData: setTopicFn;
  topicData: TopicData;
};

export const defaultTopicSession: TopicData = {
  address: null,
  answers: {},
  timesLoaded: 0,
  questionIndex: 0,
  sectionData: [],
  type: "",
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
  data: Partial<TopicData>
) => {
  return {
    ...topicData,
    ...data,
  };
};

export const SessionProvider: FunctionComponent = ({ children }) => {
  // We use the reducer to take care of too complex logic for setState.
  // Because we sometimes need to clear the sessionStorage.
  const [session, setSession] = useReducer(sessionReducer, startSession);
  const slug = useSlug();
  const slugSession = session[slug];

  const [topicData, setTopicData] = useReducer(
    topicReducer,
    defaultTopicSession
  );

  useEffect(() => {
    // Prevent HomePage and other pages from not setting session data
    if (!findTopicBySlug(slug)) {
      return;
    }

    // Set the topic/session data when (re)initilizing
    const newTopicData = slugSession || defaultTopicSession;
    if (!topicData || topicData.type !== slug) {
      if (!newTopicData.type || newTopicData.type !== slug) {
        // Set the topic `type` to the session, so we can compare the topicData
        newTopicData.type = slug;
      }

      setTopicData(newTopicData);
      setSession({ [slug]: newTopicData });
    }

    // eslint-disable-next-line
  }, [slug]);

  useEffect(() => {
    // Prevent HomePage and other pages from not setting session data
    if (!findTopicBySlug(slug)) {
      return;
    }

    // Error when there's a mismatch between expected slug
    if (topicData.type && topicData.type !== slug) {
      throw new Error(
        `topicData.type ('${topicData.type}') is not equal to slug ('${slug}')`
      );
    }

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
