import React from "react";
import { HiddenDiv, Title } from "./HiddenDebugInfoStyles";

export default ({ children, title }) => (
  <HiddenDiv className="hiddendebuginfo">
    <Title>{title}</Title>
    {children}
  </HiddenDiv>
);
