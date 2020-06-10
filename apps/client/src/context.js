import React, { useReducer, useEffect, createContext } from "react";

const session = JSON.parse(sessionStorage.getItem("sessionData"));
const Context = createContext();
const defaultValues = session
  ? session
  : {
      topic: null,
      address: {},
      answers: null,
      answersSet: false,
      questionIndex: 0,
    };

const reducer = (data, newData) => {
  // If newData is null. Clear current sessionData.
  if (newData === null) {
    sessionStorage.removeItem("sessionData");
    return defaultValues;
  }
  return { ...data, ...newData };
};

function SessionProvider(props) {
  // We use the reducer to take care of too complex logic for setState.
  // Because we sometimes need to clear the sessionStorage.
  const [data, setData] = useReducer(reducer, defaultValues);

  useEffect(() => {
    sessionStorage.setItem("sessionData", JSON.stringify(data));
  }, [data]);

  // The session provider makes the data from the context available on all pages.
  // We can use the setData function to add new data to the sessionStorage.
  return (
    <Context.Provider value={{ ...data, setData }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;
export { SessionProvider };
