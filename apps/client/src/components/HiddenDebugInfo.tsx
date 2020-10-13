/* istanbul ignore file */
import React from "react";

import { HiddenDiv, Title } from "./HiddenDebugInfoStyles";

type HiddenDebugInfoProps = {
  title?: string;
};

const HiddenDebugInfo: React.FC<
  HiddenDebugInfoProps & React.HTMLAttributes<HTMLElement>
> = ({ children, style, title }) => (
  <HiddenDiv className="hiddendebuginfo" style={style}>
    {title && <Title>{title}</Title>}
    {children}
  </HiddenDiv>
);

export default HiddenDebugInfo;
