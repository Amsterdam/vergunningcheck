import { Checker } from "@vergunningcheck/imtr-client";
import React, { FunctionComponent, useEffect } from "react";
import { createContext, useState } from "react";

import { useSlug } from "./hooks";

type setCheckerFn = (checker?: Checker) => void;

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

export const CheckerProvider: FunctionComponent<CheckerProviderProps> = ({
  children,
  defaultChecker = undefined,
}) => {
  const [checker, setChecker] = useState(defaultChecker);
  const slug = useSlug();

  useEffect(() => {
    // The slug changed, so unload the current checker
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
