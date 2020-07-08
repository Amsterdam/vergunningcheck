import React, { useReducer, useEffect, createContext } from "react";

const session = JSON.parse(sessionStorage.getItem("sessionData") as string);
const SessionContext = createContext({});
const CheckerContext = createContext({});
const defaultCheckerValue = {
  checker: null,
  topic: null,
  autofillData: {},
};
const defaultSessionValues = session
  ? session
  : {
      address: null,
      answers: null,
      questionIndex: 0,
    };

const reducer = (data: object, newData: object) => {
  if (newData === null) {
    // Clear the current sessionData if incoming data is empty (instead of setting an empty item).
    sessionStorage.removeItem("sessionData");
    return defaultSessionValues;
  }
  return { ...data, ...newData };
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
