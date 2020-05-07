import React, { useReducer, useEffect, createContext } from "react";
const session = JSON.parse(localStorage.getItem("mySession"));

let reducer = (data, newData) => {
  if (newData === null) {
    localStorage.removeItem("mySession");
    return defaultValues;
  }
  return { ...data, ...newData };
};

const defaultValues = session
  ? session
  : { topic: null, address: null, checker: null, questionId: 0};

const Context = createContext();

function CheckerProvider(props) {
  const [data, setData] = useReducer(reducer, defaultValues);

  useEffect(() => {
    localStorage.setItem("mySession", JSON.stringify(data));
  }, [data]);

  return (
    <Context.Provider value={{ ...data, setData }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;
export { defaultValues, CheckerProvider };
