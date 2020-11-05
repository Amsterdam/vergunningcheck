import { Button, themeSpacing } from "@amsterdam/asc-ui";
import React from "react";
import styled from "styled-components";

import { PREV_BUTTON } from "../utils/test-ids";

const PrevButtonStyle = styled(Button)`
  margin-left: ${themeSpacing(2)};
  align-self: center;
`;

const PrevButton: React.FC<React.HTMLAttributes<HTMLElement>> = ({
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
