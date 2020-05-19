import React, { useReducer, useEffect, createContext } from "react";
const session = JSON.parse(sessionStorage.getItem("vergunningCheckData"));

let reducer = (data, newData) => {
  if (newData === null) {
    sessionStorage.removeItem("vergunningCheckData");
    return defaultValues;
  }
  return { ...data, ...newData };
};

const defaultValues = session
  ? session
  : { topic: null, address: null, questionId: 0 };

const Context = createContext();

function CheckerProvider(props) {
  const [data, setData] = useReducer(reducer, defaultValues);

  useEffect(() => {
    sessionStorage.setItem("vergunningCheckData", JSON.stringify(data));
  }, [data]);

  return (
    <Context.Provider value={{ ...data, setData }}>
      {props.children}
    </Context.Provider>
  );
}

export default Context;
export { defaultValues, CheckerProvider };
