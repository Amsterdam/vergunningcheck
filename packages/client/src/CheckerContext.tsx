import { Checker } from "@vergunningcheck/imtr-client";
import React from "react";
import { createContext, useState } from "react";

export type setCheckerFn = (checker?: Checker) => void;

type CheckerContextType = {
  checker?: Checker;
  setChecker: setCheckerFn;
};

const defaultCheckerContext: CheckerContextType = {
  setChecker: () => {},
};

export const CheckerContext = createContext<CheckerContextType>(
  defaultCheckerContext
);

type CheckerProviderProps = {
  defaultChecker?: Checker;
};

export const CheckerProvider: React.FC<CheckerProviderProps> = ({
  children,
  defaultChecker = undefined,
}) => {
  const [checker, setChecker] = useState(defaultChecker);

  return (
    <CheckerContext.Provider
      value={{
        checker,
        setChecker,
      }}
    >
      {children}
    </CheckerContext.Provider>
  );
};
