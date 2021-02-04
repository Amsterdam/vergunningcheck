import { Button, themeSpacing } from "@amsterdam/asc-ui";
import React, { FunctionComponent, HTMLAttributes } from "react";
import styled from "styled-components";

import { PREV_BUTTON } from "../utils/test-ids";

const PrevButtonStyle = styled(Button)`
  margin-left: ${themeSpacing(2)};
  align-self: center;
`;

const PrevButton: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  children,
  onClick,
}) => (
  <PrevButtonStyle
    data-testid={PREV_BUTTON}
    type="button"
    variant="textButton"
    {...{ onClick }}
  >
    {children}
  </PrevButtonStyle>
);

export default PrevButton;
