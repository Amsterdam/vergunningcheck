import React, { createContext, useEffect, useReducer } from "react";

type QuestionAnswerType = {
  [key: string]: any;
};

type TopicSessionData = {
  questionIndex: Number;
  answers: QuestionAnswerType[];
  address: any;
};

type SessionDataType = {
  [slug: string]: TopicSessionData;
};

const session = JSON.parse(sessionStorage.getItem("sessionData") as string);
const SessionContext = createContext({});
const CheckerContext = createContext({});
const defaultCheckerValue = {
  checker: null,
  topic: null,
  autofillData: {},
};
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

  useEffect(() => {
    sessionStorage.setItem("sessionData", JSON.stringify(data));
  }, [data]);

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
