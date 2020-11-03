import React from "react";
import { createContext, useState } from "react";

import Checker from "./sttr_client/models/checker";

export type setCheckerFn = (checker: any) => void;
export type setAutofillDataFn = (autofillData: any) => void;

type CheckerContextType = {
  checker?: Checker;
  // topic?: any;
  autofillData: any;

  setChecker: setCheckerFn;
  // setChecker: Dispatch<SetStateAction<Checker | undefined>>;
  // setTopicData: () => void;
  setAutofillData: setAutofillDataFn;
};

const defaultCheckerContext: CheckerContextType = {
  // checker: null,
  // topic: null,
  autofillData: {},
  setChecker: () => {},
  // setTopicData: () => {},
  setAutofillData: () => {},
};

export const CheckerContext = createContext<CheckerContextType>(
  defaultCheckerContext
);

export const CheckerProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [checker, setCheckerBase] = useState(undefined);
  // const [topic, setTopicData] = useState({});
  const [autofillData, setAutofillData] = useState({});

  return (
    <CheckerContext.Provider
      value={{
        checker,
        setChecker: (checker) => {
          console.log("set checker to", checker);
          setCheckerBase(checker);
        },
        // topic,
        // setTopicData,
        autofillData,
        setAutofillData,
      }}
    >
      {children}
    </CheckerContext.Provider>
  );
};
