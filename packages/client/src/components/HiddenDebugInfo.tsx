/* istanbul ignore file */
import React from "react";

import { HiddenDiv } from "./HiddenDebugInfoStyles";

const HiddenDebugInfo: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  style,
}) => (
  <HiddenDiv className="hiddendebuginfo" style={style}>
    {children}
  </HiddenDiv>
);

export default HiddenDebugInfo;
