import { Checker } from "@vergunningcheck/imtr-client";
import React from "react";
import { createContext, useState } from "react";

export type setCheckerFn = (checker: any) => void;
export type setAutofillDataFn = (autofillData: any) => void;

type CheckerContextType = {
  checker?: Checker;
  autofillData: any;

  setChecker: setCheckerFn;
  setAutofillData: setAutofillDataFn;
};

const defaultCheckerContext: CheckerContextType = {
  autofillData: {},
  setChecker: () => {},
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
  const [checker, setChecker] = useState(defaultChecker);
  const [autofillData, setAutofillData] = useState(defaultAutofillData);

  return (
    <CheckerContext.Provider
      value={{
        checker,
        setChecker,
        autofillData,
        setAutofillData,
      }}
    >
      {children}
    </CheckerContext.Provider>
  );
};
