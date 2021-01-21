/* istanbul ignore file */
import React, { FunctionComponent, HTMLAttributes } from "react";

import { HiddenDiv } from "./HiddenDebugInfoStyles";

const HiddenDebugInfo: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  style,
}) => {
  if (process.env.JEST_WORKER_ID) return null;

  return (
    <HiddenDiv className="hiddendebuginfo" style={style}>
      {children}
    </HiddenDiv>
  );
};

export default HiddenDebugInfo;
