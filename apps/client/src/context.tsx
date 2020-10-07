import React, { Context, createContext, useEffect, useReducer } from "react";

import { sections } from "./config/matomo";

type QuestionAnswerType = {
  [key: string]: any;
};

type TopicSessionData = {
  activeComponents: [string];
  answers: QuestionAnswerType[];
  address: any;
  finishedComponents: [];
  questionIndex: Number;
};

export type SessionDataType = {
  [slug: string]: TopicSessionData;
  setSessionData: any;
};

type CheckerContextType = {
  checker?: any;
  topic?: any;
  autofillData?: any;
};
const defaultCheckerValue = {
  checker: null,
  topic: null,
  autofillData: {},
};

const session = JSON.parse(sessionStorage.getItem("sessionData") as string);
const SessionContext: any = createContext({});
const CheckerContext = createContext(defaultCheckerValue) as Context<
  CheckerContextType
>;
const defaultSessionValues = session ? session : {};

const reducer = (
  data: SessionDataType,
  [slug, topicData]: [string, TopicSessionData]
) => {
  if (topicData === null) {
    throw new Error("Resetting topic data this way is not supported.");
  }

  return {
    ...data,
    [slug]: {
      ...data[slug],
      ...topicData,
    },
  };
};

function SessionProvider(props: { children: React.ReactNode }) {
  // We use the reducer to take care of too complex logic for setState.
  // Because we sometimes need to clear the sessionStorage.
  const [data, setSessionData] = useReducer(reducer, defaultSessionValues);

  //@TODO replace slug with the get slug hook.
  //@TODO replace address with address type.
  function resetSessionData(slug: string, address?: any) {
    setSessionData([
      slug,
      {
        activeComponents: [sections.LOCATION_INPUT],
        address: address,
        answers: [],
        finishedComponents: [],
        questionIndex: 0,
      },
    ]);
  }

  useEffect(() => {
    sessionStorage.setItem("sessionData", JSON.stringify(data));
  }, [data]);

  // The session provider makes the data from the context available on all pages.
  // We can use the setSessionData function to add new data to the sessionStorage.
  return (
    <SessionContext.Provider
      value={{ ...data, setSessionData, resetSessionData }}
    >
      <CheckerContext.Provider value={defaultCheckerValue}>
        {props.children}
      </CheckerContext.Provider>
    </SessionContext.Provider>
  );
}

export { SessionProvider, SessionContext, CheckerContext };
