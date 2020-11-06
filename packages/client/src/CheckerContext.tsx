import { Checker } from "@vergunningcheck/imtr-client";
import React from "react";
import { createContext, useState } from "react";

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

type CheckerProviderProps = {
  defaultChecker?: Checker;
  defaultAutofillData?: any;
};

export const CheckerProvider: React.FC<CheckerProviderProps> = ({
  children,
  defaultChecker = undefined,
  defaultAutofillData = {},
}) => {
  const [checker, setCheckerBase] = useState(defaultChecker);
  // const [topic, setTopicData] = useState({});
  const [autofillData, setAutofillData] = useState(defaultAutofillData);

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
