/* istanbul ignore file */
import React, { FunctionComponent, HTMLAttributes } from "react";

import { HiddenDiv } from "./HiddenDebugInfoStyles";

const HiddenDebugInfo: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  style,
}) => (
  <HiddenDiv className="hiddendebuginfo" style={style}>
    {children}
  </HiddenDiv>
);

export default HiddenDebugInfo;
