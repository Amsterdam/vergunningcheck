import React, { createContext, useReducer } from "react";

import { Topic } from "./config";

type QuestionAnswerType = {
  [key: string]: any;
};

type TopicSessionData = {
  activeComponents?: string[];
  address?: any;
  answers?: QuestionAnswerType[];
  finishedComponents?: string[];
  questionIndex?: number;
};

export interface SessionData {
  [slug: string]: TopicSessionData;
}

export type SessionDataType = SessionData & {
  setSessionData([slug, data]: [string, any]): void;
};

type CheckerContextType = {
  checker: any | null;
  topic: Topic | null;
  autofillData: any;
};

const defaultSessionContext: SessionData = {} as SessionDataType;
const SessionContext = createContext(defaultSessionContext);
const defaultCheckerValue: CheckerContextType = {
  checker: null,
  topic: null,
  autofillData: {},
};
const CheckerContext = createContext(defaultCheckerValue);

const reducer = (
  data: SessionDataType,
  [slug, topicData]: [string, TopicSessionData]
) => {
  if (topicData === null) {
    throw new Error("Resetting topic data this way is not supported.");
  }

  const allData = {
    ...data,
    [slug]: {
      ...data?.[slug],
      ...topicData,
    },
  };
  console.log("setSessionData", allData);
  sessionStorage.setItem("sessionData", JSON.stringify(allData));
  return allData;
  // setData(allData);
  // return {
  //   ...data,
  //   [slug]: {
  //     ...data[slug],
  //     ...topicData,
  //   },
  // };
};

const defaultSessionValues = JSON.parse(
  sessionStorage.getItem("sessionData") as string
);
function SessionProvider(props: { children: React.ReactNode }) {
  // We use the reducer to take care of too complex logic for setState.
  // Because we sometimes need to clear the sessionStorage.
  const [data, setSessionData] = useReducer(reducer, defaultSessionValues);
  // useEffect(() => {
  //   sessionStorage.setItem("sessionData", JSON.stringify(data));
  // }, [data]);

  console.log("setSessionData", data);

  // The session provider makes the data from the context available on all pages.
  // We can use the setSessionData function to add new data to the sessionStorage.
  return (
    <SessionContext.Provider value={{ ...data, setSessionData }}>
      <CheckerContext.Provider value={defaultCheckerValue}>
        {props.children}
      </CheckerContext.Provider>
    </SessionContext.Provider>
  );
}

export { SessionProvider, SessionContext, CheckerContext };
