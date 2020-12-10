import { Checker } from "@vergunningcheck/imtr-client";
import React, { useEffect } from "react";
import { createContext, useState } from "react";

import { useSlug } from "./hooks";

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
  const slug = useSlug();

  useEffect(() => {
    // The slug changed, so uncheck the current checker
    setChecker(undefined);
  }, [slug]);

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
